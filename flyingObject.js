/* FlyingObject class
 * Allows easy control over:
 *   - speed:   how long (seconds) it takes to cross the viewport
 *   - rotationSpeed: seconds per full 360° spin
 *   - scale:  size multiplier against the base 40 px width
 * Create additional objects with: 
 *   new FlyingObject({ src: 'image.png', speed: 8, rotationSpeed: 3, scale: 1.2 })
 */
class FlyingObject {
  constructor({
    src = 'https://placehold.co/40x30?text=fly',
    speed = 12,           // seconds to travel across the screen
    interval = 1,         // seconds to wait AFTER leaving viewport before re-appearing
    rotationSpeed = 4,    // seconds for one full rotation
    scale = 1,            // multiply against base 40px width
    alt = 'Flying object'
  } = {}) {
    // Ensure keyframes needed for rotation exist once per document
    FlyingObject.#ensureKeyframes();

    // Wrapper element that flies across the screen
    this.speed = speed;
    this.interval = interval;

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'flying-object';
    // Responsive size: min 40px, prefer ~12vw, max 120px (all multiplied by scale)
    this.wrapper.style.width = `clamp(${40 * scale}px, ${12 * scale}vw, ${120 * scale}px)`;
    this.wrapper.style.height = 'auto';

    // Actual image that rotates inside the wrapper
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.width = '100%'; // inherit wrapper width
    img.style.height = 'auto';
    img.style.animation = `spin ${rotationSpeed}s linear infinite`;

    this.wrapper.appendChild(img);
    document.body.appendChild(this.wrapper);

    // Cancel default CSS animation defined in style.css
    this.wrapper.style.animation = 'none';

    // Helper to pick a random starting edge and compute corresponding end point
    const pickPath = () => {
      const offset = 60; // px outside viewport
      const w = window.innerWidth;
      const h = window.innerHeight;

      const edge = Math.floor(Math.random() * 4); // 0:left,1:right,2:top,3:bottom
      let startX, startY, endX, endY;

      switch (edge) {
        case 0: // left → right
          startX = -offset;
          startY = Math.random() * h;
          endX = w + offset;
          endY = Math.random() * h;
          break;
        case 1: // right → left
          startX = w + offset;
          startY = Math.random() * h;
          endX = -offset;
          endY = Math.random() * h;
          break;
        case 2: // top → bottom
          startX = Math.random() * w;
          startY = -offset;
          endX = Math.random() * w;
          endY = h + offset;
          break;
        case 3: // bottom → top
        default:
          startX = Math.random() * w;
          startY = h + offset;
          endX = Math.random() * w;
          endY = -offset;
          break;
      }

      return { startX, startY, endX, endY };
    };

    // Start a flight cycle and schedule the next based on `interval`
    const startFlight = () => {
      const { startX, startY, endX, endY } = pickPath();
      // Position at start
      this.wrapper.style.left = `${startX}px`;
      this.wrapper.style.top = `${startY}px`;

      // Use Web Animations API for smooth movement
      const animation = this.wrapper.animate(
        [
          { transform: 'translate(0, 0)' },
          { transform: `translate(${endX - startX}px, ${endY - startY}px)` }
        ],
        {
          duration: this.speed * 1000,
          easing: 'linear',
          fill: 'forwards'
        }
      );

      animation.finished.then(() => {
        setTimeout(startFlight, this.interval * 1000);
      });
    };

    // Kick off the first flight
    startFlight();
  }

  // Inject spin keyframes only once
  static #ensureKeyframes() {
    if (document.getElementById('flying-object-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'flying-object-keyframes';
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

/* =========================================================================
   Example usage – tweak the parameters or create more objects!
   ========================================================================= */
// new FlyingObject({
//   src: 'https://placehold.co/40x30?text=fly',
//   speed: 12,
//   rotationSpeed: 4,
//   scale: 1
// });

new FlyingObject({ src: 'assets/insects/cutout/insects2.webp', speed: 8, rotationSpeed: 1, scale: 1.5 });
new FlyingObject({ src: 'assets/predators/cutout/predator1.webp', speed: 8, rotationSpeed: 3, scale: 3 });



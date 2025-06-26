// Flying object animation
const flyImg = document.createElement('img');
flyImg.src = 'https://placehold.co/40x30?text=fly';
flyImg.alt = 'Flying insect';
flyImg.className = 'flying-object';
document.body.appendChild(flyImg);

function randomTop() {
  return Math.random() * window.innerHeight * 0.4 + window.innerHeight * 0.1;
}

function startAnimation() {
  flyImg.style.top = randomTop() + 'px';
}

flyImg.addEventListener('animationiteration', startAnimation);
startAnimation();

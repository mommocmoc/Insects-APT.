// Simple modal interaction for gallery items
const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');
const modalClose = document.getElementById('modalClose');

function openModal(text) {
  modalText.textContent = text;
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
}

// Attach listeners to each gallery item button
document.querySelectorAll('.gallery .item').forEach((btn) => {
  btn.addEventListener('click', () => {
    const desc = btn.getAttribute('data-desc') || 'No description available.';
    openModal(desc);
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  // Close if you click outside modal content
  if (e.target === modal) closeModal();
});

// Close on ESC key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

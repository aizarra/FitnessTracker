// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

// GLOBALS
const navItemBtns = document.querySelectorAll('.nav-item');

// EVENT LISTENERS
navItemBtns.forEach((navItemBtn) => {
  navItemBtn.addEventListener('click', (e) => {
    navItemBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('FitnessTracker JS imported successfully!');
});

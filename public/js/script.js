// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

// GLOBALS
const navItemBtns = document.querySelectorAll('.nav-item');
const filterSearch = document.querySelector('.exercise-search');
const exercises = document.querySelectorAll('.single-exercise');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  console.log('FitnessTracker JS imported successfully!');
});

navItemBtns.forEach((navItemBtn) => {
  navItemBtn.addEventListener('click', (e) => {
    navItemBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  });
});

exercises.forEach((ex) => {
  filterSearch.addEventListener('keyup', (e) => {
    const title = ex.querySelector('h2').innerHTML;

    if (title.indexOf(e.target.value.toLowerCase()) === -1) {
      ex.style.display = 'none';
    } else {
      ex.style.display = 'flex';
    }
  });
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const filterSelect = document.getElementById('filters');
const platsList = document.getElementById('plats-list');
const resultCount = document.getElementById('result-count');
const originalPlats = Array.from(platsList.querySelectorAll('.plate-cell'));

function updateFilter() {
  const value = filterSelect.value;
  let sortedPlats = [];

  if (value === 'pertinents') {
    sortedPlats = originalPlats.slice();
  } else if (value === 'a-z') {
    sortedPlats = [...originalPlats].sort((a, b) =>
      a.dataset.name.localeCompare(b.dataset.name, 'fr', { sensitivity: 'base' })
    );
  } else if (value === 'populaires') {
    sortedPlats = [...originalPlats].sort((a, b) =>
      Number(b.dataset.popularity) - Number(a.dataset.popularity)
    );
  } else if (value === 'recents') {
    sortedPlats = [...originalPlats].sort((a, b) =>
      new Date(b.dataset.date).getTime() - new Date(a.dataset.date).getTime()
    );
  }

  platsList.replaceChildren(...sortedPlats);
  resultCount.textContent = `${sortedPlats.length} résultats`;
}

filterSelect.addEventListener('change', updateFilter);
updateFilter();
const language = document.querySelector('.language');
language.addEventListener('click', () => {
  if (location.hash) language.hash = location.hash;
});
const select = document.querySelector('#category');
if (select) {
  const cards = [...document.querySelectorAll('[data-category]')];
  const empty = document.querySelector('#empty');
  function filter() {
    for (const card of cards) card.hidden = Boolean(select.value && card.dataset.category !== select.value);
    empty.hidden = cards.some(card => !card.hidden);
  }
  select.closest('.filters').hidden = false;
  select.addEventListener('change', filter);
  filter();
}

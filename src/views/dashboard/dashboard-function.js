function toggleAside () {
  const aside = document.getElementById('aside');
  aside.classList.toggle('active');
  const asideDark = document.getElementById('aside-dark');
  asideDark.classList.toggle('active');
}

const asideButton = document.querySelector('.aside-button');
const asideDark = document.querySelector('#dark-aside');
asideButton.addEventListener('click', function() {
  toggleAside();
}, false);
asideDark.addEventListener('click', function() {
  toggleAside();
}, false);

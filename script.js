const navItem = document.getElementById('menu');
const burgerIconItem = document.getElementById('burgerIcon');
const closeIconItem = document.getElementById('closeIcon');
const cardapioNavItem = document.getElementById('cardapio-navitem');
const dropdownItem = document.getElementById('dropdown');
const itensMenu = document.getElementsByClassName('item-menu');
const overlayItem = document.getElementById('overlay');

burgerIconItem.addEventListener('click', () => {
  navItem.classList.toggle('active');
});

closeIconItem.addEventListener('click', () => {
  navItem.classList.toggle('active');
});

overlayItem.addEventListener('click', () => {
  navItem.classList.toggle('active');
});

cardapioNavItem.addEventListener('click', () => {
  dropdownItem.classList.toggle('active');
});

Array.from(itensMenu).forEach((item) => {
  item.addEventListener('click', () => {
    navItem.classList.toggle('active');
  });
});

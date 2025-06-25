const navItem = document.getElementById('menu');
const burgerIconItem = document.getElementById('burgerIcon');
const btnCloseMenu = document.getElementById('btnCloseMenu');
const cardapioNavItem = document.getElementById('cardapio-navitem');
const dropdownItem = document.getElementById('dropdown');
const itensMenu = document.getElementsByClassName('item-menu');
const overlayItem = document.getElementById('overlay');
const cartOpenBtn = document.getElementById('cartBtn');
const cartCloseBtn = document.getElementById('btnCloseCart');
const cartSidebar = document.getElementById('cartSidebar');

burgerIconItem.addEventListener('click', () => {
  navItem.classList.toggle('active');
  overlayItem.classList.add('active');
});

btnCloseMenu.addEventListener('click', () => {
  navItem.classList.toggle('active');
  overlayItem.classList.remove('active');
});

overlayItem.addEventListener('click', () => {
  navItem.classList.remove('active');
  overlayItem.classList.remove('active');
  cartSidebar.classList.remove('active');
});

cardapioNavItem.addEventListener('click', () => {
  dropdownItem.classList.toggle('active');
});

Array.from(itensMenu).forEach((item) => {
  item.addEventListener('click', () => {
    navItem.classList.toggle('active');
    overlayItem.classList.remove('active');
  });
});

cartOpenBtn.addEventListener('click', () => {
  cartSidebar.classList.toggle('active');
  overlayItem.classList.add('active');
});

cartCloseBtn.addEventListener('click', () => {
  cartSidebar.classList.toggle('active');
  overlayItem.classList.remove('active');
});

const products = [
  {
    id: 1,
    title: 'Feijoada',
    description: 'Tradicional prato brasileiro feito com feijão preto',
    imgPath: './assets/img-feijoada.png',
  },

  {
    id: 2,
    title: 'Feijoada',
    description: 'Tradicional prato brasileiro feito com feijão preto',
    imgPath: './assets/img-feijoada.png',
  },
  {
    id: 3,
    title: 'Feijoada',
    description: 'Tradicional prato brasileiro feito com feijão preto',
    imgPath: './assets/img-feijoada.png',
  },
  {
    id: 4,
    title: 'Feijoada',
    description: 'Tradicional prato brasileiro feito com feijão preto',
    imgPath: './assets/img-feijoada.png',
  },
];

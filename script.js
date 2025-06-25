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

document.addEventListener('DOMContentLoaded', function () {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsContainer = cartSidebar.querySelector('#cartItems');
  const cartTotalEl = document.getElementById('total');
  const overlay = document.getElementById('overlay');

  let cart = [];

  const productSection = document.getElementById('food');

  if (productSection) {
    const addButton = productSection.querySelector('.actions button');
    const sizeSelect = productSection.querySelector('.actions select');
    const productNameEl = productSection.querySelector('h1');
    const productImgEl = productSection.querySelector('.img img');

    addButton.addEventListener('click', handleAddItem);

    function handleAddItem() {
      const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
      const optionText = selectedOption.textContent;
      const textParts = optionText.split('|');
      const sizeName = textParts[1].trim();
      const priceString = textParts[0]
        .replace('R$', '')
        .replace('(', '')
        .replace(')', '')
        .trim();
      const price = parseFloat(priceString.replace(',', '.'));
      const productName = productNameEl.textContent;
      const productImgSrc = productImgEl.src;

      const cartItem = {
        id: Date.now(),
        name: productName + ' (' + sizeName + ')',
        price: price,
        imgSrc: productImgSrc,
      };

      cart.push(cartItem);
      renderCart();

      overlay.classList.add('active');
      cartSidebar.classList.add('active');
    }
  }

  function handleRemoveItem(itemId) {
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id !== itemId) {
        newCart.push(cart[i]);
      }
    }
    cart = newCart;
    renderCart();
  }

  function calculateTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].price;
    }
    const formattedTotal = 'R$ ' + total.toFixed(2).replace('.', ',');
    cartTotalEl.textContent = formattedTotal;
  }

  function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart">Seu carrinho está vazio.</p>';
    } else {
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const itemHtml = `
        <div class="item">
            <div class="img">
            <img src="${item.imgSrc}" alt="${item.name}">
            </div>
            <div class="info">
            <div class="left">
                <h3>${item.name}</h3>
                <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="actions">
                <button class="remove-btn" data-id="${item.id}">
                <img src="../assets/icon-trash.svg" alt="Remover item">
                </button>
            </div>
            </div>
        </div>`;
        cartItemsContainer.innerHTML += itemHtml;
      }
    }
    calculateTotal();
  }

  cartItemsContainer.addEventListener('click', function (event) {
    const removeButton = event.target.closest('.remove-btn');
    if (removeButton) {
      const itemIdToRemove = parseInt(removeButton.dataset.id, 10);
      handleRemoveItem(itemIdToRemove);
    }
  });

  renderCart();
});

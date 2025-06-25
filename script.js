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

document.addEventListener('DOMContentLoaded', () => {
  const productSection = document.getElementById('food');
  const addButton = productSection.querySelector('.actions button');
  const sizeSelect = productSection.querySelector('.actions select');
  const productNameEl = productSection.querySelector('h1');
  const productImgEl = productSection.querySelector('.img img');

  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsContainer = cartSidebar.querySelector('.items');
  const cartTotalEl = document.getElementById('total');

  let cart = [];

  const handleAddItem = () => {
    const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];

    const textContent = selectedOption.textContent;
    const priceString = textContent.match(/R\$ ([\d,]+)/)[1];
    const sizeName = textContent.split('|')[1].trim();

    const price = parseFloat(priceString.replace(',', '.'));

    const productName = productNameEl.textContent;
    const productImgSrc = productImgEl.src;

    const cartItem = {
      id: Date.now(),
      name: `${productName} (${sizeName})`,
      price: price,
      imgSrc: productImgSrc,
    };

    cart.push(cartItem);

    renderCart();

    overlayItem.classList.add('active');
    cartSidebar.classList.add('active');
  };

  const handleRemoveItem = (itemId) => {
    cart = cart.filter((item) => item.id !== itemId);

    renderCart();
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cartTotalEl.textContent = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const renderCart = () => {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart">Seu carrinho está vazio.</p>';
    } else {
      cart.forEach((item) => {
        const itemHtml = `
                    <div class="item">
                        <div class="img">
                            <img src="${item.imgSrc}" alt="${item.name}">
                        </div>
                        <div class="info">
                            <div class="left">
                                <h3 id="product-name">${item.name}</h3>
                                <span id="product-price">${item.price.toLocaleString(
                                  'pt-BR',
                                  { style: 'currency', currency: 'BRL' }
                                )}</span>
                            </div>
                            <div class="actions">
                                <button class="remove-btn" data-id="${item.id}">
                                    <img src="../assets/icon-trash.svg" alt="Remover item">
                                </button>
                            </div>
                        </div>
                    </div>
                `;
        cartItemsContainer.innerHTML += itemHtml;
      });
    }

    calculateTotal();
  };

  addButton.addEventListener('click', handleAddItem);

  cartItemsContainer.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.remove-btn');
    if (removeButton) {
      const itemIdToRemove = parseInt(removeButton.dataset.id, 10);
      handleRemoveItem(itemIdToRemove);
    }
  });

  renderCart();
});

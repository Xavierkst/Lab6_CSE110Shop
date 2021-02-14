// Script.js
storage = window.localStorage;

// create an array to store product id's
let boughtItems = [];

// fetch data and check if need to store into storage
window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if (!storage.getItem("json obj")) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => storage.setItem('json obj', JSON.stringify(data)));
  }
  if (! storage.getItem('boughtItems')) {
    storage.setItem('boughtItems', boughtItems);
  }
});

// set aesthetics of website elements:
// let cartIcon = document.getElementById("cart-icon")
// let cartImg = cartIcon.appendChild(document.createElement('img'));
// cartImg.setAttribute('src', 'assets/cart-icon.png');
//
// let shopIcon = document.getElementById("shop-icon")
// let shopImg = shopIcon.appendChild(document.createElement('img'));
// shopImg.setAttribute('src', 'assets/shop-icon.png');

// prepare product list
let prodList = document.getElementById("product-list");
let searchableProdList = [];
let prods = JSON.parse(storage.getItem('json obj'));

for (let i = 0; i < prods.length; i++) {
  let item = document.createElement('product-item');
  // Set all the attributes for each product-item
  item.shadowRoot.childNodes[0].childNodes[0].setAttribute('src', prods[i]['image']);
  item.shadowRoot.childNodes[0].childNodes[0].setAttribute('alt', prods[i]['description']);
  item.shadowRoot.childNodes[0].childNodes[1].textContent = prods[i]['title'];
  item.shadowRoot.childNodes[0].childNodes[2].textContent = prods[i]['price'];

  // add an event listener for everytime the item's add or remove cart btn is clicked
  item.shadowRoot.childNodes[0].childNodes[3].addEventListener('click', (e) => {
    if (item.shadowRoot.childNodes[0].childNodes[3].textContent == "Add to Cart") {
      boughtItems.push(prods[i]['id']);
      item.shadowRoot.childNodes[0].childNodes[3].textContent = "Remove from Cart";
      item.shadowRoot.childNodes[0].childNodes[3].setAttribute('onclick', "alert('Removed from Cart!')");
      document.getElementById('cart-count').textContent = Number(document.getElementById('cart-count').textContent) + 1;
      storage.setItem('boughtItems', boughtItems);
    }
    else if (item.shadowRoot.childNodes[0].childNodes[3].textContent == "Remove from Cart") {
      // get index of this item, splice it out
      let idx = boughtItems.indexOf(prods[i]['id']);
      if (idx > -1) {
        boughtItems.splice(idx, 1);
      }
      // update localStorage
      // change add to cart button
      item.shadowRoot.childNodes[0].childNodes[3].textContent = "Add to Cart";
      item.shadowRoot.childNodes[0].childNodes[3].setAttribute('onclick', "alert('Added to Cart!')");
      document.getElementById('cart-count').textContent = Number(document.getElementById('cart-count').textContent) - 1;
      storage.setItem('boughtItems', boughtItems);
    }
    // this.textContent = "Remove From Cart";
  });
  prodList.appendChild(item);
  searchableProdList.push(item);
}

// retrieve stored items into boughtItems array
boughtItems = JSON.parse("[" + storage.getItem('boughtItems') + "]");

// update the cart for all bought items + button states
for (let j = 0; j < boughtItems.length; j++) {
    searchableProdList[boughtItems[j]].shadowRoot.childNodes[0].childNodes[3].textContent = "Remove from Cart";
    document.getElementById('cart-count').textContent = Number(document.getElementById('cart-count').textContent) + 1;
    searchableProdList[boughtItems[j]].shadowRoot.childNodes[0].childNodes[3].setAttribute('onclick', "alert('Removed from Cart!')");
}

storage.removeItem('boughtItems');
storage.setItem('boughtItems', boughtItems);

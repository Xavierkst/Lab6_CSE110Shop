// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor() {
    // call superclass' constructor first
    super();

    // elem functionality here:
    // attaching shadow root
    let shadow = this.attachShadow({mode: 'open'});

    // create internal shadow DOM structure + style
    // and attach both to shadow root at the end

    // create nested elements
    let product = document.createElement('li');
    product.setAttribute('class', 'product');

    let img = product.appendChild(document.createElement('img'));
    img.setAttribute('src', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg');
    img.setAttribute('alt', 'Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops');
    img.setAttribute('width', 200);
    // img.src = this.hasAttribute('img') ? this.getAttribute('img') : '';

    let title = product.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    // title.textContent = "Fjallraven";

    let price = product.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');

    let btn = product.appendChild(document.createElement('button'));
    btn.setAttribute('onclick', "alert('Added to Cart!')");
    btn.textContent = "Add to Cart";

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    // console.log(style.isConnected);

    style.textContent = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }

      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas:
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }

      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        width: 180px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }

      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }

      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }

      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
      `;
    // attach the created elements to the shadow DOM
    // this.shadowRoot.append(style,wrapper);
    shadow.appendChild(product);
    shadow.appendChild(style);
  }
}

customElements.define('product-item', ProductItem);

export default class ProductList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    try {
      const response = await fetch('http://localhost:3000/productos');

      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }

      const productos = await response.json();

      if (Array.isArray(productos) && productos.length > 0) {
        this.renderProductos(productos);
      } else {
        throw new Error('No hay productos disponibles');
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      this.shadowRoot.innerHTML = `<p>Error al cargar los productos.</p>`;
    }
  }

  renderProductos(productos) {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./Ordenar.css">
      <section class="productos">
        <h2>Productos</h2>
        <div class="scroll-wrapper" id="productos-container">
          ${productos
            .map(
              (producto) => `
                <product-item
                  data-id="${producto.id}"
                  data-nombre="${producto.nombre}"
                  data-precio="${producto.precio}"
                  data-categoria="${producto.categoria}"
                  class="product-item"
                ></product-item>
              `
            )
            .join('')}
        </div>
      </section>
    `;

    this.addEventListenersToProducts();
  }

  addEventListenersToProducts() {
    const productItems = this.shadowRoot.querySelectorAll('.product-item');
    productItems.forEach(item => {
      item.addEventListener('click', this.addToCart.bind(this));
    });
  }

  addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const productName = event.target.getAttribute('data-nombre');
    const productPrice = parseFloat(event.target.getAttribute('data-precio'));
    const productCategory = event.target.getAttribute('data-categoria');

    const producto = {
      id: productId,
      nombre: productName,
      precio: productPrice,
      categoria: productCategory
    };

    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    carrito.push(producto);

    sessionStorage.setItem('carrito', JSON.stringify(carrito));

    console.log('Producto agregado al carrito:', producto);
  }
}
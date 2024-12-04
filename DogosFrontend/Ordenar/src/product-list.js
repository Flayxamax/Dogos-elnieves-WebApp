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
              this.products = productos;
              this.renderProducts(productos);
              this.addEventListeners();
          } else {
              this.shadowRoot.innerHTML = `<p>No hay productos disponibles.</p>`;
          }
      } catch (error) {
          console.error('Error al cargar los productos:', error);
          this.shadowRoot.innerHTML = `<p>Error al cargar los productos.</p>`;
      }
  }

  renderProducts(productos) {
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
  }

  addEventListeners() {
      const navButtons = document.querySelectorAll('.nav-button');
      navButtons.forEach((button) => {
          button.addEventListener('click', () => {
              const categoria = button.dataset.categoria;
              this.filterProducts(categoria);
          });
      });
  }

  filterProducts(categoria) {
      if (!this.products || !Array.isArray(this.products)) {
          console.warn('La lista de productos no está inicializada o no es un arreglo.');
          return;
      }

      const filteredProducts =
          categoria === 'todo'
              ? this.products
              : this.products.filter(
                    (producto) =>
                        producto.categoria.toLowerCase() === categoria.toLowerCase()
                );

      this.renderProducts(filteredProducts); 
  }
}
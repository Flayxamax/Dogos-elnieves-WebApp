export default class ProductList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const productos = [
        { id: 1, nombre: 'Dogo', precio: 50, categoria: 'dogo' },
        { id: 2, nombre: 'Hamburguesa', precio: 70, categoria: 'hamburguesa' },
        { id: 3, nombre: 'Bebida', precio: 20, categoria: 'bebida' },
      ];
  
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
              ></product-item>
            `
              )
              .join('')}
          </div>
        </section>
      `;
    }
  }
  
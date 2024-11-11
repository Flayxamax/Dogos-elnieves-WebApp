export default class OrderList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.total = 0;
      this.items = [];
    }
  
    connectedCallback() {
      this.render();
  
      document.addEventListener('agregar-producto', (e) => {
        this.addItem(e.detail);
        this.updateTotal();
        this.render();
      });
    }
  
    addItem(producto) {
      this.items.push(producto);
      this.total += producto.precio;
    }
  
    updateTotal() {
      this.shadowRoot.querySelector('#total').textContent = `Total: $${this.total.toFixed(2)}`;
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./Ordenar.css">
        <section class="orden">
          <h2>Orden</h2>
          <div class="orden-lista">
            ${this.items
              .map(
                (item) => `
              <div class="productoOrden">
                <div class="info">
                  <span class="nombre">${item.nombre}</span>
                  <div class="detalle">
                    <span class="precio">$${item.precio.toFixed(2)}</span>
                  </div>
                </div>
                <button class="quitar">Quitar</button>
              </div>`
              )
              .join('')}
          </div>
          <span id="total">Total: $${this.total.toFixed(2)}</span>
          <button class="pagar" onclick="location.href='../CobrarOrden/CobrarOrden.html'">Pagar</button>
        </section>
      `;
    }
    
  }
  
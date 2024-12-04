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

    this.shadowRoot.addEventListener('click', (event) => this.handleRemoveItem(event));
  }

  addItem(producto) {
    this.items.push(producto);
    this.total += producto.precio;
  }

  updateTotal() {
    const totalElement = this.shadowRoot.querySelector('#total');
    if (totalElement) {
      totalElement.textContent = `Total: $${this.total.toFixed(2)}`;
    }
  }

  saveOrder() {
    if (this.items.length === 0) {
      alert('La orden está vacía. Agrega productos antes de pagar.');
      return;
    }

    const orden = {
      fechaHora: new Date().toISOString(),
      detalleOrden: this.items,
      total: this.total,
      usuarioId: 1
    };

    sessionStorage.setItem('ordenJSON', JSON.stringify(orden));
    console.log('Orden guardada en sessionStorage:', orden);

    window.location.href = '../CobrarOrden/CobrarOrden.html';
  }

  handleRemoveItem(event) {
    if (event.target.classList.contains('quitar')) {
      const index = Array.from(this.shadowRoot.querySelectorAll('.quitar')).indexOf(event.target);
      if (index !== -1) {
        const producto = this.items[index];

        this.items.splice(index, 1);
        this.total -= producto.precio;
        this.updateTotal();
        this.render();
      }
    }
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
        <button class="pagar">Pagar</button>
      </section>
    `;

    const pagarButton = this.shadowRoot.querySelector('.pagar');
    if (pagarButton) {
      pagarButton.addEventListener('click', () => this.saveOrder());
    }
  }
}
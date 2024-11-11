export default class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const nombre = this.getAttribute('data-nombre');
    const precio = this.getAttribute('data-precio');
    const id = this.getAttribute('data-id');

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./Ordenar.css">
        <div class="producto">
          <div class="info">
            <span class="nombre">${nombre}</span>
            <div class="detalle">
              <span class="precio">$${precio}</span>
            </div>
          </div>
          <button class="agregar">Agregar</button>
        </div>
      `;

    this.shadowRoot.querySelector('.agregar').addEventListener('click', () => {
      const evento = new CustomEvent('agregar-producto', {
        detail: { id, nombre, precio: parseFloat(precio) },
        bubbles: true,
        composed: true
      })

      this.dispatchEvent(evento);
    });
  }
}

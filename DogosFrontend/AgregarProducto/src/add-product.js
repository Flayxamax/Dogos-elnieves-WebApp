export default class AddProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./AgregarProducto.css">
            <header>
                <h1>Agregar Producto</h1>
            </header>
            <div class="form">
                <label for="categoria">Categoría:</label>
                <select id="categoria">
                    <option value="Dogo">Dogo</option>
                    <option value="Hamburguesa">Hamburguesa</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Extras">Extras</option>
                </select>
                <p>Nombre: </p>
                <input type="text" name="nombre">
                <p>Precio: </p>
                <input type="text" name="precio">
                <button class="save-button">Guardar</button>
                <button class="back-button">Cancelar</button>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const saveButton = this.shadowRoot.querySelector('.save-button');
        const backButton = this.shadowRoot.querySelector('.back-button');

        saveButton.addEventListener('click', () => {
            window.alert('Producto Guardado');
            window.location.href = '/DogosFrontend/Productos/Productos.html';
        });

        backButton.addEventListener('click', () => {
            window.location.href = '/DogosFrontend/Productos/Productos.html';
        });
    }
}

customElements.define('add-product', AddProduct);

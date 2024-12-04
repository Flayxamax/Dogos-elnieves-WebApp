export default class AddProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
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
                    <option value="Bebida">Bebidas</option>
                    <option value="Extra">Extras</option>
                </select>
                <p>Nombre: </p>
                <input type="text" name="nombre" placeholder="Nombre del producto">
                <p>Precio: </p>
                <input type="text" name="precio" placeholder="Precio del producto">
                <button class="save-button">Guardar</button>
                <button class="back-button">Cancelar</button>
            </div>
        `;
    }

    addEventListeners() {
        const saveButton = this.shadowRoot.querySelector('.save-button');
        const backButton = this.shadowRoot.querySelector('.back-button');

        saveButton.addEventListener('click', () => this.saveProduct());
        backButton.addEventListener('click', () => {
            window.location.href = '/DogosFrontend/Productos/Productos.html';
        });
    }

    async saveProduct() {
        const nombre = this.shadowRoot.querySelector('input[name="nombre"]').value.trim();
        const precio = this.shadowRoot.querySelector('input[name="precio"]').value.trim();
        const categoria = this.shadowRoot.querySelector('#categoria').value;

        if (!nombre || !precio || isNaN(precio)) {
            alert('Por favor, ingrese un nombre válido y un precio numérico.');
            return;
        }

        const nuevoProducto = { 
            nombre, 
            precio: parseFloat(precio), 
            categoria        
        };

        try {
            const response = await fetch('http://localhost:3000/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto),
            });

            if (!response.ok) {
                throw new Error('No se pudo agregar el producto');
            }

            alert('Producto agregado exitosamente');
            window.location.href = '/DogosFrontend/Productos/Productos.html';
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert('Error al guardar el producto');
        }
    }
}

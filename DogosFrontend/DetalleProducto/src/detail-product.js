export default class DetailProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.loadProductDetails();
        this.shadowRoot.querySelector('#botonModificar').addEventListener('click', () => this.toggleEditMode(true));
        this.shadowRoot.querySelector('#botonCancelar').addEventListener('click', () => this.toggleEditMode(false));
        this.shadowRoot.querySelector('#botonGuardar').addEventListener('click', () => this.saveProductChanges());
        this.shadowRoot.querySelector('#botonEliminar').addEventListener('click', () => this.deleteProduct());
        this.shadowRoot.querySelector('#botonRegresarAtras').addEventListener('click', () => {window.location.href = '/DogosFrontend/Productos/Productos.html';});
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./DetalleProducto.css">
            <header>
                <h1>Información del Producto</h1>
            </header>
            <div class="form">
                <label for="categoria">Categoría:</label>
                <select id="categoria" disabled>
                    <option>Dogo</option>
                    <option>Hamburguesa</option>
                    <option>Bebida</option>
                    <option>Extra</option>
                </select>
                <input type="hidden" id="idProducto">
                <p>Nombre: </p>
                <input type="text" name="nombre" readonly>
                <p>Precio: </p>
                <input type="text" name="precio" readonly>
                <button id="botonModificar">Modificar</button>
                <button id="botonEliminar">Eliminar</button>
                <button id="botonRegresarAtras">Regresar</button>
                <button id="botonGuardar" style="display: none;">Guardar</button>
                <button id="botonCancelar" style="display: none;">Cancelar</button>
            </div>
        `;
    }

    async loadProductDetails() {
        const idProducto = new URLSearchParams(window.location.search).get('id');
        if (!idProducto) {
            this.shadowRoot.innerHTML = `<p>Error: No se proporcionó un ID de producto.</p>`;
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/productos/${idProducto}`);
            if (!response.ok) {
                throw new Error('No se pudo cargar la información del producto');
            }

            const producto = await response.json();
            this.setValues(producto);
        } catch (error) {
            console.error('Error al cargar el producto:', error);
            this.shadowRoot.innerHTML = `<p>Error al cargar la información del producto.</p>`;
        }
    }

    setValues(producto) {
        this.shadowRoot.querySelector('#idProducto').value = producto.id;
        this.shadowRoot.querySelector('input[name="nombre"]').value = producto.nombre;
        this.shadowRoot.querySelector('input[name="precio"]').value = producto.precio;
        this.shadowRoot.querySelector('#categoria').value = producto.categoria;
    }

    toggleEditMode(isEditMode) {
        const inputs = this.shadowRoot.querySelectorAll('input');
        const categoria = this.shadowRoot.querySelector('#categoria');

        inputs.forEach(input => {
            input.readOnly = !isEditMode;
        });

        categoria.disabled = !isEditMode;

        this.shadowRoot.querySelector('#botonModificar').style.display = isEditMode ? 'none' : 'block';
        this.shadowRoot.querySelector('#botonGuardar').style.display = isEditMode ? 'block' : 'none';
        this.shadowRoot.querySelector('#botonCancelar').style.display = isEditMode ? 'block' : 'none';
        this.shadowRoot.querySelector('#botonEliminar').style.display = isEditMode ? 'none' : 'block';
        this.shadowRoot.querySelector('#botonRegresarAtras').style.display = isEditMode ? 'none' : 'block';
    }

    async saveProductChanges() {
        const idProducto = this.shadowRoot.querySelector('#idProducto').value;
        const nombre = this.shadowRoot.querySelector('input[name="nombre"]').value;
        const precio = parseFloat(this.shadowRoot.querySelector('input[name="precio"]').value);
        const categoria = this.shadowRoot.querySelector('#categoria').value;

        const productoActualizado = { nombre, precio, categoria };

        try {
            const response = await fetch(`http://localhost:3000/productos/${idProducto}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoActualizado)
            });

            if (!response.ok) {
                throw new Error('No se pudo guardar los cambios');
            }

            alert('Cambios guardados exitosamente');
            this.toggleEditMode(false);
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            alert('Error al guardar los cambios');
        }
    }

    async deleteProduct() {
        const idProducto = this.shadowRoot.querySelector('#idProducto').value;

        try {
            const response = await fetch(`http://localhost:3000/productos/${idProducto}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto');
            }

            alert('Producto eliminado exitosamente');
            window.location.href = '/DogosFrontend/Productos/Productos.html';
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto');
        }
    }
}

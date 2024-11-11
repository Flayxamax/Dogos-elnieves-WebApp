export default class DetailProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setValues();
        this.shadowRoot.querySelector('#botonModificar').addEventListener('click', () => this.toggleEditMode(true));
        this.shadowRoot.querySelector('#botonCancelar').addEventListener('click', () => this.toggleEditMode(false));
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
                    <option>Bebidas</option>
                    <option>Extras</option>
                </select>
                <input type="hidden" id="idProducto">
                <input type="text" name="nombre" readonly>
                <input type="text" name="precio" readonly>
                <input type="hidden" id="categoriaProducto">
                <button id="botonModificar">Modificar</button>
                <button id="botonEliminar">Eliminar</button>
                <button id="botonRegresarAtras" onClick="history.go(-1);">Regresar</button>
                <button id="botonGuardar" style="display: none;">Guardar</button>
                <button id="botonCancelar" style="display: none;">Cancelar</button>
                <button id="botonRegresar" style="display: none;">Regresar</button>
            </div>
        `;
    }

    setValues() {
        const idProducto = this.getAttribute('idProducto');
        const nombre = this.getAttribute('nombre');
        const precio = this.getAttribute('precio');
        const categoria = this.getAttribute('categoria');

        this.shadowRoot.querySelector('#idProducto').value = idProducto;
        this.shadowRoot.querySelector('input[name="nombre"]').value = nombre;
        this.shadowRoot.querySelector('input[name="precio"]').value = precio;
        this.shadowRoot.querySelector('#categoria').value = categoria;
        this.shadowRoot.querySelector('#categoriaProducto').value = categoria;
    }


    toggleEditMode(isEditMode) {
        const inputs = this.shadowRoot.querySelectorAll('input');
        const buttons = this.shadowRoot.querySelectorAll('button');
        const categoria = this.shadowRoot.querySelector('#categoria');

        inputs.forEach(input => {
            input.readOnly = !isEditMode;
            input.disabled = !isEditMode;
        });

        categoria.disabled = !isEditMode;

        this.shadowRoot.querySelector('#botonModificar').style.display = isEditMode ? 'none' : 'block';
        this.shadowRoot.querySelector('#botonGuardar').style.display = isEditMode ? 'block' : 'none';
        this.shadowRoot.querySelector('#botonCancelar').style.display = isEditMode ? 'block' : 'none';
        this.shadowRoot.querySelector('#botonEliminar').style.display = isEditMode ? 'none' : 'block';
        this.shadowRoot.querySelector('#botonRegresarAtras').style.display = isEditMode ? 'none' : 'block';
    }


}


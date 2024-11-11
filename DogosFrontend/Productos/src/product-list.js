export default class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderProducts();
        this.addEventListeners();
    }

    renderProducts() {
        const productos = [
            { nombre: 'Producto 1', precio: '$20', categoria: 'dogo', id: 1 },
            { nombre: 'Producto 2', precio: '$15', categoria: 'hamburguesa', id: 2 },
            { nombre: 'Producto 3', precio: '$10', categoria: 'bebida', id: 3 }
        ];
        this.shadowRoot.innerHTML = `

            <link rel="stylesheet" href="./Productos.css">
            <section class="productos">
                <h2>Productos</h2>
                <div class="productos-container">
                    <table class="tabla-productos">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Modificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productos.map(producto => `
                                <tr class="producto" data-categoria="${producto.categoria}" data-id="${producto.id}">
                                    <td>${producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td><button class="modificar" >Modificar</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        `;
    }

    addEventListeners() {
        const modificarBotones = this.shadowRoot.querySelectorAll('.modificar');
        modificarBotones.forEach(button => {
            button.addEventListener('click', (event) => {
                const producto = event.target.closest('.producto');
                const idProducto = producto.dataset.id;
                window.location.href = `../DetalleProducto/DetalleProducto.html`;
            });
        });

        const navButtons = document.querySelectorAll('.nav-button');
        const productosOriginales = this.shadowRoot.querySelectorAll('.producto');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoria = button.dataset.categoria;
                this.filterProducts(categoria, productosOriginales);

            });
        });
    }

    filterProducts(categoria, productosOriginales) {
        const productos = [];
        productosOriginales.forEach(producto => {
            if (categoria === 'todo' || producto.dataset.categoria === categoria) {
                productos.push(producto.outerHTML);
            }
        });

        const tbody = this.shadowRoot.querySelector('.tabla-productos tbody');
        tbody.innerHTML = productos.join('');
    }
}

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
                                <tr class="producto" data-id="${producto.id}" data-categoria="${producto.categoria}">
                                    <td>${producto.nombre}</td>
                                    <td>$${producto.precio}</td>
                                    <td><button class="modificar">Modificar</button></td>
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
        modificarBotones.forEach((button, index) => {
            button.addEventListener('click', () => {
                const producto = this.products[index];
                window.location.href = `../DetalleProducto/DetalleProducto.html?id=${producto.id}`;
            });
        });
    
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
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
    
        const filteredProducts = categoria === 'todo'
            ? this.products
            : this.products.filter(product => product.categoria.toLowerCase() === categoria.toLowerCase());
    
        this.renderProducts(filteredProducts);
    }
    
    
}

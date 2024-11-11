export default class TotalSummary extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./CobrarOrden.css">
            <section class="resumen-orden">
                <h2>Resumen de Orden</h2>
                <div class="productos-orden">
                    
                </div>
                <div class="total">
                    Total: <span id="totalOrden">$0.00</span>
                </div>
                <button class="finalizarOrdenTarjeta">Pago con tarjeta</button>
            </section>
        `;
        this.simularOrden(); 
        this.cargarOrden();
    }

    simularOrden() {
        const ordenEjemplo = {
            productos: [
                { nombre: 'Producto A', precio: 50.00 },
                { nombre: 'Producto B', precio: 30.00 },
                { nombre: 'Producto B', precio: 30.00 },
                { nombre: 'Producto B', precio: 30.00 },
                { nombre: 'Producto B', precio: 30.00 },
                { nombre: 'Producto B', precio: 30.00 },
                { nombre: 'Producto B', precio: 30.00 },
                { nombre: 'Producto B', precio: 30.00 }
            ]
        };
        sessionStorage.setItem('ordenJSON', JSON.stringify(ordenEjemplo));
    }

    cargarOrden() {
        const ordenJSON = sessionStorage.getItem('ordenJSON');
        if (ordenJSON) {
            const orden = JSON.parse(ordenJSON);
            const productosOrdenContainer = this.shadowRoot.querySelector('.productos-orden');
            let total = 0;

            orden.productos.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto-resumen');
                productoDiv.innerHTML = `<span class="nombre">${producto.nombre}</span> - $${producto.precio.toFixed(2)}`;
                productosOrdenContainer.appendChild(productoDiv);
                total += producto.precio;
            });

            const totalElement = this.shadowRoot.querySelector('#totalOrden');
            totalElement.textContent = `$${total.toFixed(2)}`;
        } else {
            console.error("No se encontró ninguna orden en la sesión.");
        }
    }
}

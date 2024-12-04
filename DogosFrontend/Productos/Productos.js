import ProductList from "./src/product-list.js";
import { validateSessionAndRol } from '../../utils/DogoUtilsJWT.js';

customElements.define('product-list', ProductList);

document.addEventListener('DOMContentLoaded', () => {
    validateSessionAndRol('/DogosFrontend/Login/Login.html', 'ADMIN');
    const botonesNav = document.querySelectorAll('.nav-button');

    botonesNav.forEach(button => {
        button.addEventListener('click', (event) => {
            const categoria = event.target.dataset.categoria;
            const listaProductos = document.querySelector('product-list');
            listaProductos.filterProducts(categoria);
        });
    });
});

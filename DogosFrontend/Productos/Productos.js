import ProductList from "./src/product-list.js";

customElements.define('product-list', ProductList);

document.addEventListener('DOMContentLoaded', () => {
    const botonesNav = document.querySelectorAll('.nav-button');

    botonesNav.forEach(button => {
        button.addEventListener('click', (event) => {
            const categoria = event.target.dataset.categoria;
            const listaProductos = document.querySelector('product-list');
            listaProductos.filterProducts(categoria);
        });
    });
});

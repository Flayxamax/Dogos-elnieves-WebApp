import ProductList from './src/product-list.js';
import ProductItem from './src/product-item.js';
import OrderList from './src/order-list.js';
import { validateSessionAndRol } from '../../utils/DogoUtilsJWT.js';

customElements.define('product-list', ProductList);
customElements.define('product-item', ProductItem);
customElements.define('order-list', OrderList);

document.addEventListener('DOMContentLoaded', () => {
    validateSessionAndRol('/DogosFrontend/Login/Login.html', 'CAJERO');
});
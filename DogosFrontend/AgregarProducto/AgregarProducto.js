import AddProduct from "./src/add-product.js";
import { validateSessionAndRol } from '../../utils/DogoUtilsJWT.js';

customElements.define('add-product', AddProduct);

document.addEventListener('DOMContentLoaded', () => {
    validateSessionAndRol('/DogosFrontend/Login/Login.html', 'ADMIN');
});
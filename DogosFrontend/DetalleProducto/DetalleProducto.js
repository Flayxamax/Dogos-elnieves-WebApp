import DetailProduct from "./src/detail-product.js";
import { validateSessionAndRol } from '../../utils/DogoUtilsJWT.js';

customElements.define('detail-product', DetailProduct);

document.addEventListener('DOMContentLoaded', () => {
    validateSessionAndRol('/DogosFrontend/Login/Login.html', 'ADMIN');
});
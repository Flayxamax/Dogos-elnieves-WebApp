import GenerateReport from "./src/generate-report.js";
import { validateSessionAndRol } from '../../utils/DogoUtilsJWT.js';

customElements.define('generate-report', GenerateReport);

document.addEventListener('DOMContentLoaded', () => {
    validateSessionAndRol('/DogosFrontend/Login/Login.html', 'ADMIN');
});
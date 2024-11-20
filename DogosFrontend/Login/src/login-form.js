export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderForm();
    }

    renderForm() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./Login.css">
            <div class="form-container">
                <h2>Inicio de sesión</h2>
                <div class="form-group">
                    <label for="usuario">Nombre de Usuario:</label>
                    <input type="text" id="usuario" name="usuario" placeholder="Ingrese el Nombre de Usuario" required>
                </div>
                <div class="form-group">
                    <label for="pass">Contraseña:</label>
                    <input type="password" id="pass" name="pass" placeholder="Ingrese su Contraseña" required>
                </div>
                <button class="submit-button" type="button">Iniciar Sesión</button>
                <button class="back-button" type="button">Regresar</button>
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const submitButton = this.shadowRoot.querySelector('.submit-button');
        const backButton = this.shadowRoot.querySelector('.back-button');

        submitButton.addEventListener('click', () => {
            window.location.href = '/DogosFrontend/Productos/productos.html';
        });

        backButton.addEventListener('click', () => {
            window.location.href = '/DogosFrontend/Inicio/Inicio.html';
        });
    }

}

customElements.define('login-form', LoginForm);

export default class IndexComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderForm();
    }

    renderForm() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./Inicio.css">
            <div class="form-container">
                <div class="form-group">
                    <h2>Bienvenido</h2>
                    <button class="admin-button" type="button">Iniciar sesión</button>
                </div>   
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const adminButton = this.shadowRoot.querySelector('.admin-button');

        adminButton.addEventListener('click', () => {
            window.location.href = '/DogosFrontend/Login/Login.html';
        });
    }
}

customElements.define('index-component', IndexComponent);

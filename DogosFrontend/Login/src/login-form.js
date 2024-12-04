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

        submitButton.addEventListener('click', async () => {
            const usuario = this.shadowRoot.querySelector('#usuario').value;
            const contrasena = this.shadowRoot.querySelector('#pass').value;

            try {
                const response = await fetch('http://localhost:3000/usuarios/iniciarsesion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario, contrasena }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    alert(`Error: ${error.message}`);
                    return;
                }

                const data = await response.json();

                localStorage.setItem('token', data.token);

                const rol = getRolFromToken(data.token);

                alert(`Bienvenido, ${data.usuario.usuario}`);

                if (rol === 'ADMIN') {
                    window.location.href = '/DogosFrontend/Productos/productos.html';;
                } else if (rol === 'CAJERO') {
                    window.location.href = '/DogosFrontend/Ordenar/Ordenar.html';
                } else {
                    alert('Rol no autorizado');
                }

            } catch (error) {
                alert(error, 'Error al iniciar sesión. Inténtelo más tarde.');
            }
        });

        backButton.addEventListener('click', () => {
            window.location.href = '/DogosFrontend/Inicio/Inicio.html';
        });
    }

}

function getRolFromToken(token) {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.role;
}

customElements.define('login-form', LoginForm);

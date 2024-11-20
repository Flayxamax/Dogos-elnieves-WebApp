export default class GenerateReport extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./GenerarReporte.css">
            <div class="container">
                <label for="desde">Desde:</label>
                <input type="date" id="desde" name="desde">

                <label for="hasta">Hasta:</label>
                <input type="date" id="hasta" name="hasta">

                <button class="botonBuscar">Buscar</button>
                <div class="container-iframe">
                    <iframe id="reporteIframe"></iframe>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const buscarButton = this.shadowRoot.querySelector('.botonBuscar');
        buscarButton.addEventListener('click', () => this.enviarFechas());
    }

    enviarFechas() {
        const desde = this.shadowRoot.querySelector('#desde').value;
        const hasta = this.shadowRoot.querySelector('#hasta').value;

    }
}

customElements.define('generate-report', GenerateReport);

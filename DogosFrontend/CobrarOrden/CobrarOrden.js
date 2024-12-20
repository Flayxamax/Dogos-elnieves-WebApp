import TotalSummary from './src/total-summary.js';
import { validateSessionAndRol } from '../../utils/DogoUtilsJWT.js';

customElements.define('total-summary', TotalSummary);

document.addEventListener('DOMContentLoaded', () => {

    validateSessionAndRol('/DogosFrontend/Login/Login.html', 'CAJERO');

    const montoInput = document.getElementById('monto');
    const cambioSpan = document.getElementById('cambio');
    const finalizarOrdenBtn = document.querySelector('.finalizarOrden');
    const finalizarOrdenTarjetaBtn = document.querySelector('.finalizarOrdenTarjeta');
    const API_URL = 'http://localhost:3000';

    const token = localStorage.getItem('token');
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const idUsuario = payload.userId;

    montoInput.addEventListener('input', () => {
        const montoPagado = parseFloat(montoInput.value) || 0;
        const totalElement = document.querySelector('total-summary').shadowRoot.querySelector('#totalOrden');
        const total = parseFloat(totalElement.textContent.replace('$', '')) || 0;

        if (montoPagado >= total) {
            cambioSpan.textContent = (montoPagado - total).toFixed(2);
        } else {
            cambioSpan.textContent = '0.00';
        }
    });

    const finalizarOrden = async () => {
        const montoPagado = parseFloat(montoInput.value) || 0;
        const totalElement = document.querySelector('total-summary').shadowRoot.querySelector('#totalOrden');
        const total = parseFloat(totalElement.textContent.replace('$', '')) || 0;

        try {
            const ordenJSON = sessionStorage.getItem('ordenJSON');
            const orden = JSON.parse(ordenJSON);
            const fecha = new Date().toISOString();

            const response = await fetch(`${API_URL}/orden`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fechaHora: fecha,
                    total: total,
                    usuarioId: idUsuario,
                    detalleOrden: orden.detalleOrden,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al guardar la orden');
            } else {
                sessionStorage.removeItem('ordenJSON');
                alert(`Orden realizada con éxito.`);
                history.go(-1);
            }

        } catch (error) {
            alert('Ocurrió un error al guardar la orden. Inténtalo de nuevo.');
        }
    };

    finalizarOrdenBtn.addEventListener('click', async () => {
        const montoPagado = parseFloat(montoInput.value) || 0;
        const totalElement = document.querySelector('total-summary').shadowRoot.querySelector('#totalOrden');
        const total = parseFloat(totalElement.textContent.replace('$', '')) || 0;

        if (montoPagado >= total) {
            finalizarOrden();
        } else {
            alert('El monto pagado no es suficiente para cubrir el total.');
        }
    });

    finalizarOrdenTarjetaBtn.addEventListener('click', () => {
        finalizarOrden();
    });


});

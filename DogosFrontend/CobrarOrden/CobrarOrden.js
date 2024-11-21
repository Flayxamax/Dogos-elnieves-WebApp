import TotalSummary from './src/total-summary.js';

customElements.define('total-summary', TotalSummary);

document.addEventListener('DOMContentLoaded', () => {
    const montoInput = document.getElementById('monto');
    const cambioSpan = document.getElementById('cambio');
    const finalizarOrdenBtn = document.querySelector('.finalizarOrden');
    const API_URL = 'http://localhost:3000';

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

    async function pagar(){

    };

    finalizarOrdenBtn.addEventListener('click', async () =>{
        const montoPagado = parseFloat(montoInput.value) || 0;
        const totalElement = document.querySelector('total-summary').shadowRoot.querySelector('#totalOrden');
        const total = parseFloat(totalElement.textContent.replace('$', '')) || 0;
    
        if (montoPagado >= total) {
            try {
                const ordenJSON = sessionStorage.getItem('ordenJSON');
                const orden = JSON.parse(ordenJSON);
                const fecha = new Date().toISOString();
                const idUsuario = 1; 

                const response = await fetch(`${API_URL}/orden`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        numero: orden.numero,
                        fechaHora: fecha,
                        total: total,
                        usuarioId: idUsuario,
                        detalleOrden: orden.detalleOrden,
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Error al guardar la orden');
                }else{
                    sessionStorage.removeItem('ordenJSON');
                    alert(`Orden realizada con éxito.`);
                    history.go(-1);
                }
        

            } catch (error) {
                alert('Ocurrió un error al guardar la orden. Inténtalo de nuevo.');
            }
        } else {
            alert('El monto pagado no es suficiente para cubrir el total.');
        }

    });
    

});

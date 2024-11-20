import TotalSummary from './src/total-summary.js';

customElements.define('total-summary', TotalSummary);

document.addEventListener('DOMContentLoaded', () => {
    const montoInput = document.getElementById('monto');
    const cambioSpan = document.getElementById('cambio');
    const finalizarOrdenBtn = document.querySelector('.finalizarOrden');
    const API_URL = 'http://localhost:3000';

    const orden = {
            numero:1,
            detalleOrden: [
                {
                    id: 5,
                    nombre: 'Dogo',
                    precio: 100.00,
                    cantidadProducto: 3,
                    createdAt: '2024-11-20T10:30:00Z',
                    updatedAt: '2024-11-20T10:30:00Z'
                },
                {
                    id: 6,
                    nombre: 'Hotdog',
                    precio: 120.00,
                    cantidadProducto: 3,
                    createdAt: '2024-11-20T10:30:00Z',
                    updatedAt: '2024-11-20T10:30:00Z'
                }
            ]
        
    };

    sessionStorage.setItem('ordenJSON', JSON.stringify(orden));

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

    finalizarOrdenBtn.addEventListener('click', async () => {
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
                }
    
                const ordenGuardada = await response.json();
    
                sessionStorage.removeItem('ordenJSON');
    
                alert(`Orden realizada con éxito.`);

                history.go(-1);

            } catch (error) {
                console.error(error);
                alert('Ocurrió un error al guardar la orden. Inténtalo de nuevo.');
            }
        } else {
            alert('El monto pagado no es suficiente para cubrir el total.');
        }
    });
    
});

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

    async enviarFechas() {
        const desde = this.shadowRoot.querySelector('#desde').value;
        const hasta = this.shadowRoot.querySelector('#hasta').value;
    
        if (!desde || !hasta) {
            alert('Por favor, selecciona ambas fechas.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/orden/filtrar/?desde=${desde}&hasta=${hasta}`);
            console.log(response);
            const ordenes = await response.json();
            console.log(ordenes);
    
            if (response.ok) {
                this.generarPDF(ordenes, desde, hasta);
            } else {
                alert(ordenes.message || 'Error al obtener órdenes.');
            }
        } catch (error) {
            console.error('Error al solicitar órdenes:', error);
            alert('Hubo un error al conectarse al servidor.');
        }
    }

    

    generarPDF(ordenes, desde, hasta) {

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString(); 
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const img = new Image();
        const headerFooterColor = [149, 0, 20];
        const textColor = [255, 255, 255];
        const margin = 20;

        img.src="/utils/logonievespng.png"

        
        let totalGeneral = 0;

        doc.setFillColor(...headerFooterColor);
        doc.rect(margin, 10, doc.internal.pageSize.width - 2 * margin, 20, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`Periodo: ${desde} - ${hasta}`, doc.internal.pageSize.width / 2, 40, { align: "center" });
        doc.setFontSize(25);
        doc.setTextColor(...textColor);
        doc.text("Reporte de Ventas", doc.internal.pageSize.width / 2, 22, { align: "center" });
        doc.addImage(img, "PNG", 16, 5, 31, 31); 
        doc.setTextColor(0, 0, 0);

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Órdenes:", margin, 50);

        doc.autoTable({
            startY: 60,
            head: [['Número de orden', 'Fecha', 'Total']],
            body: ordenes.map((orden) =>{
                totalGeneral += +orden.total;
                return [orden.id, formatDate(orden.fechaHora), `$${orden.total}`];
            }),
            margin: {left: margin, right: margin},
            headStyles: {
                fillColor: headerFooterColor,
                textColor: textColor
            },
            bodyStyles: {
                fillColor: [245, 245, 245],
                textColor: [0, 0, 0]
            }
        });

        doc.setFont("helvetica", "bold");
        doc.text("Total General:", margin, doc.lastAutoTable.finalY + 10);
        doc.setFont("helvetica", "normal");
        doc.text(`$${totalGeneral.toFixed(2)}`, margin + 40, doc.lastAutoTable.finalY + 10);

        const fechaActual = new Date().toLocaleDateString();
        doc.setFontSize(10);
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFillColor(...headerFooterColor);

            doc.rect(margin, doc.internal.pageSize.height - 20, doc.internal.pageSize.width - 2 * margin, 10, "F");
            doc.setTextColor(...textColor);
            doc.text(`Fecha: ${fechaActual}`, margin + 5, doc.internal.pageSize.height - 13);
            doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - margin - 30, doc.internal.pageSize.height - 13);
        }
        
        const pdfData = doc.output('datauristring');
        const iframe = this.shadowRoot.querySelector('#reporteIframe');
        iframe.src = pdfData; 
    }
    
}



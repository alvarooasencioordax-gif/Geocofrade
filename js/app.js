/* --- CONTROL DE PANELES (MENÚ Y CAPAS) --- */
function toggleMenu(panelId) {
    // 1. Buscamos el panel que queremos abrir
    const panel = document.getElementById(panelId);
    
    // 2. Buscamos si hay OTRO panel abierto para cerrarlo primero
    const todosLosPaneles = document.querySelectorAll('.side-panel');
    todosLosPaneles.forEach(p => {
        if (p !== panel) {
            p.classList.remove('active');
        }
    });

    // 3. Abrimos o cerramos el panel actual
    panel.classList.toggle('active');
}

/* --- FUNCIÓN DESPEJAR PANTALLA (MODO MAPA LIMPIO) --- */
function togglePantallaLimpia() {
    // Añadimos o quitamos la clase 'ui-hidden' al body
    // Esto activará las reglas que escribimos en el CSS
    document.body.classList.toggle('ui-hidden');
    
    // Cerramos cualquier panel lateral que estuviera abierto por si acaso
    const paneles = document.querySelectorAll('.side-panel');
    paneles.forEach(p => p.classList.remove('active'));
}

/* --- LÓGICA DE LOS WIDGETS (CLIMA Y REDES) --- */
// Hacemos que los widgets de abajo a la derecha cambien solos cada 5 segundos
let widgetActual = 0;
const widgets = document.querySelectorAll('.widget-content');

function rotarWidgets() {
    // Quitamos la visibilidad al widget actual
    widgets[widgetActual].classList.remove('active-widget');
    
    // Pasamos al siguiente (si es el último, vuelve al primero)
    widgetActual = (widgetActual + 1) % widgets.length;
    
    // Mostramos el nuevo widget
    widgets[widgetActual].classList.add('active-widget');
}

// Iniciamos la rotación automática
if (widgets.length > 0) {
    setInterval(rotarWidgets, 10000); 
}

/* --- CAMBIO DE ESTILO DE MAPA --- */
// Esta función conecta con la lógica que tendrás en map.js
function cambiarBaseMapa(estilo) {
    console.log("Cambiando mapa a modo: " + estilo);
    
    // Si ya tienes Leaflet configurado, aquí llamarías a la función 
    // que cambia las capas (layers) del mapa.
    if (typeof window.setMapLayer === 'function') {
        window.setMapLayer(estilo);
    }
}

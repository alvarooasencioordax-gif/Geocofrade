/* =============================================================
   LÓGICA DEL CALENDARIO (MOSTRAR / OCULTAR)
   ============================================================= */

function abrirCalendario() {
    const panel = document.getElementById('panel-calendario');
    const menu = document.getElementById('panel-menu');

    // 1. Cerramos el menú lateral si está abierto
    if(menu) menu.classList.remove('active');

    // 2. Mostramos el panel (cambiamos el display de none a flex)
    panel.style.display = 'flex';
    
    // 3. Generamos los días (esto lo ampliaremos luego)
    renderizarDias();
}

function cerrarCalendario() {
    const panel = document.getElementById('panel-calendario');
    panel.style.display = 'none';
}

function renderizarDias() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = ''; // Limpiamos

    // Generamos 31 días de prueba para que veas cómo queda
    for (let i = 1; i <= 31; i++) {
        const dia = document.createElement('div');
        dia.className = 'calendar-day';
        dia.innerText = i;
        
        // Si es el día 1 (San José Artesano en tu dibujo), le ponemos estilo de evento
        if(i === 1) dia.classList.add('has-event');

        // Al hacer clic, que suba la tarjeta de abajo
        dia.onclick = () => mostrarDetalleEvento(i);
        
        grid.appendChild(dia);
    }
}

function mostrarDetalleEvento(dia) {
    const sheet = document.getElementById('event-sheet');
    
    // Si pulsamos el día 1, mostramos la tarjeta
    if(dia === 1) {
        sheet.classList.add('active');
    } else {
        // Si pulsamos otro día, la bajamos (para probar)
        sheet.classList.remove('active');
    }
}

// Para cerrar la tarjeta si se toca fuera o hacia abajo (opcional)
document.addEventListener('click', (e) => {
    const sheet = document.getElementById('event-sheet');
    if (e.target.id === 'panel-calendario' && sheet.classList.contains('active')) {
        sheet.classList.remove('active');
    }
});
/* =============================================================
   GESTOS TÁCTILES PARA CERRAR LA TARJETA DEL EVENTO
   ============================================================= */

let eventStartY = 0;
let isDraggingEvent = false;

document.addEventListener('DOMContentLoaded', () => {
    const eventSheet = document.getElementById('event-sheet');
    const panelCalendario = document.getElementById('panel-calendario');

    if (eventSheet && panelCalendario) {
        // Detectamos el toque en la zona superior de la tarjeta (la barrita o la foto)
        eventSheet.addEventListener('touchstart', (e) => {
            // Solo permitimos arrastrar si el toque es en la mitad superior de la tarjeta
            if (e.touches[0].clientY < eventSheet.getBoundingClientRect().top + 200) {
                eventStartY = e.touches[0].clientY;
                isDraggingEvent = true;
                eventSheet.style.transition = "none"; // Movimiento fluido
            }
        });

        eventSheet.addEventListener('touchmove', (e) => {
            if (!isDraggingEvent) return;

            const currentY = e.touches[0].clientY;
            const deltaY = currentY - eventStartY;

            if (deltaY > 0) { 
                eventSheet.style.transform = `translateY(${deltaY}px)`;
            }
        });

        eventSheet.addEventListener('touchend', (e) => {
            isDraggingEvent = false;
            const endY = e.changedTouches[0].clientY;
            const deltaY = endY - eventStartY;

            // Devolvemos la transición suave
            eventSheet.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";

            if (deltaY > 100) { // Si el arrastre es suficiente, cerramos
                eventSheet.classList.remove('active');
                // Un pequeño delay para que no se vea el salto de posición
                setTimeout(() => {
                    eventSheet.style.transform = "translateY(100%)";
                }, 400);
            } else {
                // Si no, la tarjeta vuelve a subir
                eventSheet.style.transform = "translateY(0)";
            }
        });
    }
});
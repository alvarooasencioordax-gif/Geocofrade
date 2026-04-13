
/* =============================================================
   2. GESTIÓN DEL IDIOMA
   ============================================================= */
function seleccionarIdioma(idioma) {
    localStorage.setItem('geocofrade_idioma', idioma);
    actualizarChecksIdioma(idioma);
    
    if (typeof aplicarTraduccion === 'function') {
        aplicarTraduccion();
    }
    console.log("Idioma cambiado a: " + idioma);
}

function actualizarChecksIdioma(idiomaSeleccionado) {
    const checksIdioma = document.querySelectorAll('.check-icon-lang');
    
    checksIdioma.forEach(check => {
        check.parentElement.classList.remove('is-selected-lang');
    });

    const icono = document.getElementById('check-' + idiomaSeleccionado);
    if (icono) {
        icono.parentElement.classList.add('is-selected-lang');
    }
}

/* =============================================================
   3. CONTROL DEL PANEL (BOTTOM SHEET) Y GESTOS
   ============================================================= */
let startY = 0;
let isDragging = false;

function abrirAjustes() {
    const overlay = document.getElementById('panel-overlay');
    const sheet = document.getElementById('sheet-ajustes');
    const panelMenu = document.getElementById('panel-menu');

    // 1. Cerramos el menú lateral primero
    if(panelMenu) panelMenu.classList.remove('active');

    // 2. Mostramos el overlay con flex para asegurar visibilidad
    if(overlay) overlay.style.display = 'block';

    // 3. Forzamos la subida del panel
    if(sheet) {
        sheet.classList.add('active');
        sheet.style.transform = "translateY(0)"; // FUERZA BRUTA: lo pone en pantalla sí o sí
    }
}

function cerrarAjustes() {
    const overlay = document.getElementById('panel-overlay');
    const sheet = document.getElementById('sheet-ajustes');
    
    if(overlay) overlay.style.display = 'none';
    if(sheet) {
        sheet.style.transform = "translateY(100%)";
        sheet.classList.remove('active');
    }
}

// Lógica para arrastrar hacia abajo (solo en móviles/táctil)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar Idioma guardado (o español por defecto)
    const idiomaGuardado = localStorage.getItem('geocofrade_idioma') || 'es';
    
    // 2. Aplicar el tick visual inmediatamente
    actualizarChecksIdioma(idiomaGuardado);

    // 3. Traducir los textos de la interfaz
    if (typeof aplicarTraduccion === 'function') {
        aplicarTraduccion();
    }
});

/* =============================================================
   4. INICIO Y SOPORTE
   ============================================================= */
function reportarIncidencia() {
    const email = "soporte@geocofrade.com";
    const asunto = "Incidencia en GeoCofrade SF";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(asunto)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar Mapa guardado
    const mapaGuardado = localStorage.getItem('mapa_preferido') || 'claro';
    actualizarChecks(mapaGuardado);

    // 2. Cargar Idioma guardado
    const idiomaGuardado = localStorage.getItem('geocofrade_idioma') || 'es';
    actualizarChecksIdioma(idiomaGuardado);

    // 3. Traducir la página según el idioma guardado
    if (typeof aplicarTraduccion === 'function') {
        aplicarTraduccion();
    }
});
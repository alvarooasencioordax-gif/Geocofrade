// --- 1. CONFIGURACIÓN Y DICCIONARIOS ---

const traducciones = {
    es: {
        menu_title: "Menú Principal",
        nav_home: "Inicio",
        nav_hermandades: "Hermandades",
        nav_report: "Reportar Incidencia",
        nav_settings: "Ajustes",
        layers_title: "Capas del Mapa",
        layer_churches: "Iglesias y Templos",
        layer_carrera: "Carrera Oficial",
        map_style: "ESTILO MAPA",
        style_light: "Mapa Base",
        style_dark: "Vista Nocturna"
    },
    en: {
        menu_title: "Main Menu",
        nav_home: "Home",
        nav_hermandades: "Brotherhoods",
        nav_report: "Report Incident",
        nav_settings: "Settings",
        layers_title: "Map Layers",
        layer_churches: "Churches & Temples",
        layer_carrera: "Official Route",
        map_style: "MAP STYLE",
        style_light: "Standard Map",
        style_dark: "Night View"
    }
};

const configuracionWidgets = [
    { id: 'widget-weather', duracion: 10000 },
    { id: 'widget-linkedin', duracion: 5000 },
    { id: 'widget-instagram', duracion: 5000 }
];

const urlGPS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQagEjCsiVtXXRkqXsdJ7rzBV5-kbHd17tJic72JaYjD3Ir6hoT_tHA9Sl8pmNAZG6XKdIML7vnBQYa/pub?gid=0&single=true&output=csv";

let indiceWidgetActual = 0;
let marcadoresGPS = {};

// --- 2. FUNCIONES DE TRADUCCIÓN ---

function aplicarIdioma() {
    const idiomaActual = localStorage.getItem('idiomaPref') || 'es';
    const elementosTraducibles = document.querySelectorAll('[data-key]');
    
    elementosTraducibles.forEach(el => {
        const llave = el.getAttribute('data-key');
        if (traducciones[idiomaActual] && traducciones[idiomaActual][llave]) {
            el.innerText = traducciones[idiomaActual][llave];
        }
    });
}

// --- 3. LÓGICA DE INTERFAZ (UI) ---

function toggleMenu(panelId) {
    const paneles = document.querySelectorAll('.side-panel');
    const panelObjetivo = document.getElementById(panelId);
    
    paneles.forEach(panel => {
        if (panel.id !== panelId) panel.classList.remove('active');
    });

    if (panelObjetivo) panelObjetivo.classList.toggle('active');
}

function togglePantallaLimpia() {
    document.querySelectorAll('.side-panel').forEach(p => p.classList.remove('active'));
    document.body.classList.toggle('ui-hidden');
}

function rotarWidgetDinamico() {
    configuracionWidgets.forEach(w => {
        const el = document.getElementById(w.id);
        if (el) el.classList.remove('active-widget');
    });

    const widgetActual = configuracionWidgets[indiceWidgetActual];
    const elActual = document.getElementById(widgetActual.id);
    
    if (elActual) elActual.classList.add('active-widget');

    let tiempo = widgetActual.duracion;
    indiceWidgetActual = (indiceWidgetActual + 1) % configuracionWidgets.length;
    setTimeout(rotarWidgetDinamico, tiempo);
}

// --- 4. SISTEMA GPS ---

async function actualizarGPS() {
    try {
        const res = await fetch(`${urlGPS}&t=${Date.now()}`);
        const csv = await res.text();
        const filas = csv.split("\n").slice(1);
        
        filas.forEach(f => {
            const columnas = f.split(",");
            if (columnas.length >= 3) {
                const id = columnas[0].trim().toUpperCase();
                const lat = parseFloat(columnas[1]);
                const lon = parseFloat(columnas[2]);
                
                if (!isNaN(lat) && !isNaN(lon)) {
                    if (!marcadoresGPS[id]) {
                        marcadoresGPS[id] = L.marker([lat, lon]).addTo(map).bindPopup(`<b>Paso: ${id}</b>`);
                    } else {
                        marcadoresGPS[id].setLatLng([lat, lon]);
                    }
                }
            }
        });
    } catch (e) {
        console.error("Error GPS:", e);
    }
}

// --- 5. INICIO DE LA APLICACIÓN Y SERVICE WORKER ---

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('✅ SW Activo'))
            .catch(err => console.warn('❌ Error SW', err));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplicamos idioma
    aplicarIdioma();
    
    // 2. Iniciamos widgets
    rotarWidgetDinamico();
    
    // 3. Iniciamos GPS si estamos en la página del mapa (donde existe 'map')
    if (typeof map !== 'undefined') {
        actualizarGPS();
        setInterval(actualizarGPS, 5000);
    }
});
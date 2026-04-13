// --- 0. CONFIGURACIÓN DE CAPAS BASE ---
const capasBase = {
    claro: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap'
    }),
    oscuro: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap'
    })
};

// --- 1. COMPROBAR PREFERENCIAS Y ORIGEN ---
const temaGuardado = localStorage.getItem('temaPref') || 'claro';
const irALat = localStorage.getItem('irALat');
const irALon = localStorage.getItem('irALon');

// Si venimos de clicar en una hermandad, usamos sus coordenadas; si no, centro de La Isla
const centroInicial = (irALat && irALon) ? [parseFloat(irALat), parseFloat(irALon)] : [36.4645, -6.1983];
const zoomInicial = (irALat && irALon) ? 18 : 15;

// --- 2. INICIALIZAR EL MAPA ---
var map = L.map('map', { 
    zoomControl: false,
    layers: [capasBase[temaGuardado]] // Carga el tema que el usuario eligió en ajustes
}).setView(centroInicial, zoomInicial);

// Limpiamos el localStorage para que el próximo refresco sea normal
localStorage.removeItem('irALat');
localStorage.removeItem('irALon');

// --- 3. GRUPOS DE CAPAS ---
var grupoIglesias = L.layerGroup().addTo(map);
var grupoCarrera = L.layerGroup().addTo(map);

// --- 4. PUNTOS DE INTERÉS (IGLESIAS) ---
const iconoIglesia = L.divIcon({
    html: '<div style="font-size: 30px; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5));">⛪</div>',
    className: 'icono-fijo', iconSize: [30, 30], iconAnchor: [15, 15]
});

const iglesias = [
    { loc: [36.465905, -6.196121], nombre: "Iglesia Mayor" },
    { loc: [36.458410, -6.209852], nombre: "San Servando y San Germán" },
    { loc: [36.481318, -6.199299], nombre: "Parroquia de la Inmaculada" },
    { loc: [36.457653, -6.203309], nombre: "Iglesia del Carmen" },
    { loc: [36.471211, -6.198062], nombre: "Santo Cristo" },
    { loc: [36.472140, -6.197689], nombre: "Vera Cruz" },
    { loc: [36.468420, -6.193205], nombre: "Pastora" },
    { loc: [36.476123, -6.186873], nombre: "Sagrada Familia" },
    { loc: [36.462035, -6.200081], nombre: "San Francisco" },
    { loc: [36.463568, -6.197614], nombre: "San José" }
];

iglesias.forEach(i => {
    L.marker(i.loc, {icon: iconoIglesia})
     .bindPopup(`<b>${i.nombre}</b>`)
     .addTo(grupoIglesias);
});

// --- 5. CARRERA OFICIAL ---
var trazadoCarreraOficial = [
    [36.465389, -6.196967], [36.464645, -6.197701], 
    [36.464958, -6.198182], [36.464494, -6.198622]  
];

var lineaCarreraOficial = L.polyline(trazadoCarreraOficial, { 
    color: '#734960', 
    weight: 5, 
    opacity: 0.8, 
    lineCap: 'round' 
}).addTo(grupoCarrera).bindPopup("<b>🚧 Carrera Oficial 🚧</b>");

// --- 6. FUNCIONES DE CONTROL ---

function cambiarBaseMapa(tipo) {
    if (capasBase[tipo]) {
        for (let capa in capasBase) {
            map.removeLayer(capasBase[capa]);
        }
        capasBase[tipo].addTo(map);
        // Guardamos la preferencia también desde el mapa
        localStorage.setItem('temaPref', tipo);
    }
}

function toggleCapa(tipo) {
    if (tipo === 'iglesias') {
        if (map.hasLayer(grupoIglesias)) map.removeLayer(grupoIglesias);
        else grupoIglesias.addTo(map);
    }
    if (tipo === 'carrera') {
        if (map.hasLayer(grupoCarrera)) map.removeLayer(grupoCarrera);
        else grupoCarrera.addTo(map);
    }
}

function ajustarGrosorLineas() {
    var zoom = map.getZoom();
    let nuevoGrosor = zoom >= 17 ? 10 : (zoom >= 15 ? 6 : 3);
    lineaCarreraOficial.setStyle({ weight: nuevoGrosor });
}

map.on('zoomend', ajustarGrosorLineas);
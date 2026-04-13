document.addEventListener('DOMContentLoaded', () => {
    const modoOscuroPreferido = localStorage.getItem('modoOscuro') === 'true';
    
    if (modoOscuroPreferido) {
        // Aquí llamas a tu función para poner el mapa oscuro
        CambiarBaseMapa('oscuro');
        // También tendrías que marcar el radio button de oscuro si lo tienes
    }
});
window.addEventListener('pageshow', () => {
    const favorito = localStorage.getItem('mapa_preferido');
    if (favorito) {
        // Llamamos a tu función de cambiar mapa
        CambiarBaseMapa(favorito);
        
        // Marcamos el radio button visualmente para que coincida
        const radio = document.querySelector(`input[value="${favorito}"]`) || 
                      document.querySelector(`input[onclick*="${favorito}"]`);
        if (radio) radio.checked = true;
    }
});
// Función que se ejecuta al cargar el mapa
function cargarPreferencia() {
    const favorito = localStorage.getItem('mapa_preferido');
    
    if (favorito === 'oscuro') {
        // Ejecutamos tu función de cambiar mapa (asegúrate de que se llama así)
        CambiarBaseMapa('oscuro');
        
        // Y si tienes los radio buttons en el index, marcamos el oscuro
        const radioOscuro = document.querySelector('input[onclick*="oscuro"]');
        if (radioOscuro) radioOscuro.checked = true;
    }
}

// Ejecutar la comprobación al cargar
document.addEventListener('DOMContentLoaded', cargarPreferencia);
// 1. Definimos las capas (comprueba que las URLs son correctas)
var capaClaro = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png');
var capaOscuro = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
// Capa Satélite de Google (es la que mejor funciona y más rápido carga)
var capaSatelite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    attribution: '© Google'
});

// 2. Creamos el mapa con la capa clara por defecto
var map = L.map('map', {
    zoomControl: false,
    layers: [capaClaro] 
}).setView([36.4667, -6.1986], 15);

window.CambiarBaseMapa = function(estilo) {
    console.log("Cambiando a: " + estilo);

    map.removeLayer(capaClaro);
    map.removeLayer(capaOscuro);
    map.removeLayer(capaSatelite);

    if (estilo === 'claro') capaClaro.addTo(map);
    if (estilo === 'oscuro') capaOscuro.addTo(map);
    if (estilo === 'satelite') capaSatelite.addTo(map);

    // ESTO ES LO NUEVO: Fuerza al mapa a redibujarse
    setTimeout(() => { map.invalidateSize(); }, 100);
}
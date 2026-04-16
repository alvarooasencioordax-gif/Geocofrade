const map = L.map('map',{zoomControl:false}).setView([36.4667, -6.1986], 15);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© Google'
}).addTo(map);


const miIconoRadar = L.divIcon({
    className: 'punto-radar',
    iconSize: [20, 20]
});

L.marker([36.4667, -6.1986], { icon: miIconoRadar }).addTo(map);



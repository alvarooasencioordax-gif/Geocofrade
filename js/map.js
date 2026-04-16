const map = L.map('map',{zoomControl:false}).setView([36.4667, -6.1986], 15);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([36.4667, -6.1986]).addTo(map)
    .bindPopup('Humildad y Paciencia')
    .openPopup();

const traducciones = {
    'es': {
        // --- Página de Ajustes ---
        'nav-volver': '<i class="fa-solid fa-chevron-left"></i> Volver',
        'titulo-ajustes': 'Ajustes',
        'seccion-mapa': 'Estilo de mapa predeterminado',
        'seccion-idioma': 'Idioma',
        'seccion-soporte': 'Soporte',
        'btn-reportar': 'Reportar incidencia',
        'v-clara': 'Vista Clara',
        'v-nocturna': 'Vista Nocturna',
        'v-satelite': 'Vista Satélite',

        // --- Página de Inicio (Mapa) ---
        'menu_title': 'Menú Principal',
        'nav_home': 'Inicio',
        'nav_hermandades': 'Hermandades',
        'nav_settings': 'Ajustes',
        'layers_title': 'Estilo del Mapa',
        'style_light': 'Vista Clara',
        'style_dark': 'Vista Nocturna',
        'style_satellite': 'Vista Satélite',
        'widget_dev': 'Desarrollo web',
        'widget_ig': 'Sígueme en IG'
    },
    'en': {
        // --- Página de Ajustes ---
        'nav-volver': '<i class="fa-solid fa-chevron-left"></i> Back',
        'titulo-ajustes': 'Settings',
        'seccion-mapa': 'Default Map Style',
        'seccion-idioma': 'Language',
        'seccion-soporte': 'Support',
        'btn-reportar': 'Report an issue',
        'v-clara': 'Light View',
        'v-nocturna': 'Night View',
        'v-satelite': 'Satellite View',

        // --- Página de Inicio (Mapa) ---
        'menu_title': 'Main Menu',
        'nav_home': 'Home',
        'nav_hermandades': 'Brotherhoods',
        'nav_settings': 'Settings',
        'layers_title': 'Map Style',
        'style_light': 'Light View',
        'style_dark': 'Night View',
        'style_satellite': 'Satellite View',
        'widget_dev': 'Web Development',
        'widget_ig': 'Follow me on IG'
    }
};

function aplicarTraduccion() {
    const idioma = localStorage.getItem('geocofrade_idioma') || 'es';
    const elementos = document.querySelectorAll('[data-key]');

    elementos.forEach(el => {
        const clave = el.getAttribute('data-key');
        if (traducciones[idioma] && traducciones[idioma][clave]) {
            el.innerHTML = traducciones[idioma][clave];
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', aplicarTraduccion);
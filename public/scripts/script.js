var map = L.map('map').setView([50.447305, 30.522186], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Fetch coordinates from API
async function getCoordinates() {
    try {
        const response = await fetch('/api/connect-webflow');
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const coordinatesHtml = data.items[0]['field-for-coordinates-in-decimal-degrees'];
            const regex = /([-+]?\d+\.\d+),\s*([-+]?\d+\.\d+)/g;
            const matches = [...coordinatesHtml.matchAll(regex)];
            const coordinates = matches.map(match => [parseFloat(match[1]), parseFloat(match[2])]);
            
            console.log('Coordinates:', coordinates); // Виводимо дані у консоль
            loadPolygons(coordinates);
        } else {
            console.error('No valid coordinates data found.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
// Load coordinates into map
function loadPolygons(array) {
    var polygon = L.polygon(array).addTo(map);
    console.log('Polygon added to map');
}
// Call getCoordinates() after the map is set up
getCoordinates();
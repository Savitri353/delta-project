

var map = L.map('map').setView([listingCoordinates[1], listingCoordinates[0]], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([listingCoordinates[1], listingCoordinates[0]]).addTo(map);

marker.bindPopup("This is the listing location").openPopup();
mapboxgl.accessToken =mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style:"mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});

const marker1 = new mapboxgl.Marker({color:"green"})
    .setLngLat(listing.geometry.coordinates)//Listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4> ${listing.location}</h4> <p> Exact Location provided after booking</p>`))
    .addTo(map);

// initialize standard background using tile layer
let standard =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

// initialize an object to hold map backgrounds options -- backgroundMaps.
let background = {
    "Standard": standard,
};

// declare LayerGroups for each dataset to plot
//https://leafletjs.com/examples/layers-control/, https://leafletjs.com/reference.html#layergroup
let allEarthquakes = new L.LayerGroup();

// initialize map with standard background -- lat/long are for san andreas fault line
let map = L.map("map-id", {
	center: [35.8, -119.4],
	zoom: 3,
  layers: [standard]});

// initialize overlay object to add to layer control.
let overlay = {
    "Earthquakes - All": allEarthquakes};

// create control layer -- add overlay and background map
L.control.layers(background, overlay).addTo(map);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// store URL for all earthquake data
let urlEarthquakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// define function to read json data, add earthquake markers to map
function init() {
    
    // use d3 to ingest earthquake data from url
    d3.json(urlEarthquakes).then(function(data) {

        // declare and initialize objects for visualizations
        let features = data.features;

        // initialize array to see all earthquake depths
        let depthArray = []

        // for loop to iterate through each earthquake
        for (var f = 0; f < features.length; f++) {
            
            // declare and initialize coordinate objects -- lat/long/depth
            let coords = features[f].geometry.coordinates;
            let lat = coords[1];
            let lng = coords[0];
            let depth = coords[2];
            depthArray.push(depth);

            // declare and initialize properties objects
            let properties = features[f].properties;
            let location = properties.place;
            let size = properties.mag;
            
            // create marker for each earthquake. bind popup with earthquake information
            L.circleMarker([lat, lng], {
                color: "black",
                fillColor: "black",
                radius: size})
            .bindPopup(`<h3>${location}</h3><br/>Magnitude: ${size}<br/>Depth: ${depth}`).addTo(allEarthquakes)};    
    });

    // add markers to map
    allEarthquakes.addTo(map);
};

init();

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

// initialize map with standard background
let map = L.map("map-id", {
	center: [40.7, -94.5],
	zoom: 3,
  layers: [standard]});

// initialize overlay object to add to layer control.
let overlay = {
    "Earthquakes - All": allEarthquakes};

// create control layer -- add overlay and background map
L.control.layers(background, overlay).addTo(map);


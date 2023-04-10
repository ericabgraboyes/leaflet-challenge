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
	center: [40.5, -90.5],
	zoom: 3,
  layers: [standard]});

// initialize overlay object to add to layer control.
let overlay = {
    "Earthquakes - All": allEarthquakes};

// create control layer -- add overlay and background map
L.control.layers(background, overlay).addTo(map);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// color scheme: https://www.color-hex.com/color-palettes/?page=4
// define function to determine circle color based on earthquake depth
function setColor(depth) {
    if(depth <= 10 ) {
      return "#40ff00";}
    else if (depth <= 30 ) {
      return "#bfff00";}
    if(depth <= 50) {
      return "#ffff00" ;}
    else if(depth <= 70) {
      return "#ffd200";}
    else if(depth <= 90) {
      return "#ff7c00";}
    return "#ff0000"}; 

// define function to determine circle size
function setSize(size) {
  if(size === 0) {
    return 1;}
    return size * 3};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// set up legend for circle markers
  let legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const depths = ["<-10", 10, 30, 50, 70, 90];
    const colors = ["#40ff00","#bfff00","#ffff00","#ffd200","#ff7c00","#ff0000"];
    let legendTitle = "<h4>Depth in km</h4>"

    div.innerHTML = legendTitle;

  // use for loop to iterate through colors and depths; pair color with orresponding depth, using index position.
    for (var i = 0; i < depths.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
      "<i style=\"background: " + colors[i] + "\"></i>" +
      depths[i] + (depths[i + 1] ? " to " + depths[i + 1] + "<br>" : "+");}
    return div;};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            // console.log("testcoords:",coords)

            let lat = coords[1];
            let lng = coords[0];
            let depth = coords[2];

            // declare and initialize properties objects
            let properties = features[f].properties;
            let location = properties.place;
            let size = properties.mag;
            
            // create marker for each earthquake. bind popup with earthquake information
            // stroke = false - disables borders on circles
            L.circleMarker([lat, lng], {
                fillOpacity:1,
                clickable: true,
                stroke: true,
                color: setColor(depth),
                fillColor: setColor(depth),
                radius: setSize(size)})
            .bindPopup(`<h3>${location}</h3><br/>Magnitude: ${size}<br/>Depth: ${depth}`).addTo(allEarthquakes)
        };
    
            // // generate list of earthquake depths for color function
            // var allDepths = depthArray.map((e, i) => (e)).join('/')
            // console.log('All depths',allDepths);            
            
    });

    // add markers to map
    allEarthquakes.addTo(map);

    // add legend to map
    legend.addTo(map)
    
};

init();

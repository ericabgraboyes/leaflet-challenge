//////////////////////////////////---  MAP SETUP - ///////////////////////////////////////////
// initialize map object with standard background -- lat/long are for san andreas fault line
let map = L.map("map-id", {
  center: [40.5, -90.5],
  zoom: 4});

// create tile layer - base background
standard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

// add tile layer to map
standard.addTo(map)

//////////////////////////////////---  CIRCLE COLORS & DEPTH  ----- ///////////////////////////////////////////
// functions to style earthquake markers / https://www.color-hex.com/color-palettes/?page=4 (color scheme)

// define function to determine circle color based on earthquake depth
function setColor(depth) {
  if(depth < 10 ) {
    return "#40ff00";}
  else if (depth < 30 ) {
    return "#bfff00";}
  if(depth < 50) {
    return "#ffff00" ;}
  else if(depth < 70) {
    return "#ffd200";}
  else if(depth < 90) {
    return "#ff7c00";}
  return "#ff0000"}; 

// define function to determine circle size
function setSize(size) {
if(size === 0) {
  return 1;}
  return size * 3};

///////////////////////////////////---    LEGEND   ---- //////////////////////////////////////////////////////
// create a legend
let legend = L.control({position: "bottomright"});

// define legend function
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

/////////////////////////////////////--- EARTHQUAKE DATA ----////////////////////////////////////////////////////
// store URL for all earthquake data
let urlEarthquakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// define function to read json data, add earthquake markers to map
function earthquakes() {
    
  // use d3 to ingest earthquake data from url
  d3.json(urlEarthquakes).then(function(data) {
          
    // declare and initialize objects for visualizations
    let features = data.features;
    // console.log(data)

    // // initialize array to see all earthquake depths
    // let depthArray = []

    // can also use .filter and arrow function to filter data; apply for loop to new variable.
    // let filteredata = features.filter(f => f.geometry.coordinates[2] >= 500)
    // console.log(filteredata)

    // for loop to iterate through each earthquake
    for (var f = 0; f < features.length; f++) {
            
      // declare and initialize coordinate objects -- lat/long/depth
      let coords = features[f].geometry.coordinates;
        // console.log("testcoords:",coords)

        // use conditional statement to filter records for given depth; filters all records 
        // if (coords[2] >= 10) {

          let lat = coords[1];
          let lng = coords[0];
          let depth = coords[2];

          // declare and initialize properties objects
          let properties = features[f].properties;
          let location = properties.place;
          let size = properties.mag;

          // convert time from milliseconds since epoch to normal date/time
          let date = new Date (properties.time);

          // create marker for each earthquake. bind popup with earthquake information
          L.circleMarker([lat, lng], {
              fillOpacity:1,
              clickable: true,
              stroke: true,
              color: "black",
              weight: 0.25,
              fillColor: setColor(depth),
              radius: setSize(size)})
            .bindPopup(`<h4>${location}</h4><b>Magnitude</b>: ${size}<br/><b>Reported Depth (km):</b> ${depth} km<br>Time: ${date.toDateString()}`).addTo(map)
    };
      
            // // generate list of earthquake depths for color function
            // var allDepths = depthArray.map((e, i) => (e)).join('/')
            // console.log('All depths',allDepths);            
            
  });
    // add legend to map
  legend.addTo(map)
    
};

earthquakes();

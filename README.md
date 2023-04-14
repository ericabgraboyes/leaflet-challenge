# leaflet-challenge
https://ericabgraboyes.github.io/leaflet-challenge/

##### Data Source Credit for Tectonic Plates [repo](https://github.com/fraxen/tectonicplates): Hugo Ahlenius, Nordpil and Peter Bird



***Background Earthquake Analysis***: The project used Leaflet, d3.js, and open streetmap to create visualizations based on [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) API data on earthquakes.  The second part of the project was optional and involved adding an additional overlay maplayer related to GeoJSON data from a tectonic plates [repo](https://github.com/fraxen/tectonicplates).  The second aspect of the project also included additional background maps to access via layer control.  Due to the nature of the assignment consisted of two separate components and is broken into two separate folders, with different javascript files and html files to support the visualization.

**Leaflet Step 1**: The project The first part of the project involved plotting earthquakes as circle markers on a standard openstreetamp.  The marker size relates to the magnitude of the earthquake and the color relates to the earthquake's depth.  The earthquake data captured in the visualization was pulled from http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

**Leaflet Step 2**: The second part of the project relates to the bonus and enhances the work done in part 1 by adding two additional base layer options to the map, in addition to plotting tetocnic plate data.  By adding additional base and overlay layers to the map, this part of the project lets the user select which background they would like to see in the visualization and which data they wish to see plotted.  The user is able to select not only the background, but either one or both of the earthquake datapoints plotted (quakes and plates)

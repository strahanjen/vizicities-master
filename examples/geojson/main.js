// St Paul
var coords = [44.945345, -93.091978];

var world = VIZI.world('world', {
  skybox: false,
  postProcessing: false
}).setView(coords);

// Add controls
VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// Chroma scale for height-based colours
var colourScale = chroma.scale('YlOrBr').domain([0,400]);  //update the domain to match the domain of values in our data

// Mapzen GeoJSON tile including points, linestrings and polygons

VIZI.geoJSONLayer('osm_buildings.geojson', {
  //below are two more test geosjon layers parcels(polygons) & downtown housing (points)
//VIZI.geoJSONLayer('taxparcels_3dtest.geojson', {
//VIZI.geoJSONLayer('dthousinginventory.geojson', {
  output: true,
  style: function(feature) {
    var height;

    if (feature.properties.count) {
/*column to use for height attribute of the 3d shape,
Currently set to use count from osm_buildings json file.
If testing dthousinginventory.geojson, change this to feature.properties.num_units
*/
      height = feature.properties.count;

    } else {
      height = 1;
    }

    var colour = colourScale(height).hex();

    return {
      color: colour,       //this is for styling polygon data
      pointColor: colour,  //this is for styling point data
      height: height
    };
  },
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);

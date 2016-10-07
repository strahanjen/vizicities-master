var layer;
var world;
window.onload = function(){
  updateMap();
}


function updateMap() {

  layer =  "Fall2015TransitStopsAvgDailyOns_grid.geojson";


    // St Paul
    var coords = [44.952000, -93.094178];

    world = VIZI.world('world', {
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
    var colourScale = chroma.scale('YlOrBr').domain([0,500]);  //update the domain to match the domain of values in our data

    // Mapzen GeoJSON tile including points, linestrings and polygons

    VIZI.geoJSONLayer(layer, {
      //below are two more test geosjon layers parcels(polygons) & downtown housing (points)
    //VIZI.geoJSONLayer('taxparcels_3dtest.geojson', {
    //VIZI.geoJSONLayer('dthousinginventory.geojson', {
      output: true,
      style: function(feature) {
        var height;

        if (feature.properties.Ons_int_su) {
    /*column to use for height attribute of the 3d shape,
    Currently set to use count from osm_buildings json file.
    If testing dthousinginventory.geojson, change this to feature.properties.num_units
    */
          height = feature.properties.Ons_int_su * .25;

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

}

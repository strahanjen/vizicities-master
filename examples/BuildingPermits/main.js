var layer;
var world;
window.onload = function(){
  updateMap();
}


function updateMap() {

  layer =  "Approved_Building_Permits_buildingDTSTPaul.geojson";


    // St Paul
    var coords = [44.956000, -93.097178];

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
    var colourScale = chroma.scale('YlOrBr').domain([0,8000000]);  //update the domain to match the domain of values in our data

    // Mapzen GeoJSON tile including points, linestrings and polygons

    VIZI.geoJSONLayer(layer, {
      //below are two more test geosjon layers parcels(polygons) & downtown housing (points)
    //VIZI.geoJSONLayer('taxparcels_3dtest.geojson', {
    //VIZI.geoJSONLayer('dthousinginventory.geojson', {
      output: true,
      style: function(feature) {
        var height;

        if (feature.properties.state_val<70000000) {
    /*column to use for height attribute of the 3d shape,
    Currently set to use count from osm_buildings json file.
    If testing dthousinginventory.geojson, change this to feature.properties.num_units
    */   if (feature.properties.state_val>10000000) {height = feature.properties.state_val *.000035;} else {height = feature.properties.state_val*.0001;}
        } else {
          height = 0;
        }
        switch(feature.properties.per_subtyp) {
            case "Commercial":
                var colour = '#fdbf6f';
                break;
            case "Institutional":
                var colour = '#f9c4d1';
                break;
            case "Mixed (Commercial/Residential)":
                var colour = '#aa16ac';
                break;
            case "Residential (Multi-Fam)":
                var colour = '#2b8725';
                break;
            case "Single Family Dwelling":
                var colour = '#1d63e5';
                break;
            default:
                var colour = '#FFFFFF';
        }


        return {
          color: colour,       //this is for styling polygon data
          pointColor: colour,  //this is for styling point data
          height: height
        };
      },
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
    }).addTo(world);

}

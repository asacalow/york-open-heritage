$(function() {
  var geocoder = L.mapbox.geocoder('examples.map-i86nkdio'),
      map = L.mapbox.map('map', 'examples.map-i86nkdio');

  geocoder.query('York, UK', showMap);

  function showMap(err, data) {
      // The geocoder can return an area, like a city, or a
      // point, like an address. Here we handle both cases,
      // by fitting the map bounds to an area or zooming to a point.
      map.fitBounds(data.lbounds);
  }

  var featureLayer = L.mapbox.featureLayer()
    .loadURL('/geojson/listed-buildings.geojson')
    .on('ready', function(e) {
      var clusterGroup = new L.MarkerClusterGroup();
      e.target.eachLayer(function(layer) {
          clusterGroup.addLayer(layer);
      });
      map.addLayer(clusterGroup);
    });
});

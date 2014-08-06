$(function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoiYXNhY2Fsb3ciLCJhIjoiRTJKRXBjcyJ9.exxHW0UP0xPazUJ-b2I8OQ';
  var geocoder = L.mapbox.geocoder('mapbox.places-v1'),
      map = L.mapbox.map('map', 'asacalow.j5ai5p8f');

  geocoder.query('York, UK', showMap);

  function showMap(err, data) {
      // The geocoder can return an area, like a city, or a
      // point, like an address. Here we handle both cases,
      // by fitting the map bounds to an area or zooming to a point.
      map.setView([data.latlng[0], data.latlng[1]], 12);
  }

  var IMDScoreLayer = L.mapbox.featureLayer()
    .loadURL('/geojson/imd.geojson').on('ready', function(e) {
      e.target.eachLayer(function(layer) {
        var props = {
            name: layer.feature.properties['LSOA01NM'],
            rank: layer.feature.properties['IMDRANK'],
            gssCode: layer.feature.properties['LSOACODE'],
            globalRank: layer.feature.properties['RANKIMD'],
            averageSale: layer.feature.properties['AVGSALE']
          },
          rank = props['rank'];
        var colour = (
          rank < 24   ? '#555' :
          rank < 47   ? '#777' :
          rank < 71   ? '#999' :
          rank < 94   ? '#bbb' :
          '#ddd'
        );
        layer.setStyle({
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 0.7,
          fillColor: colour
        });
        var template = JST['hbs/lsoa-info.hbs'],
            content = template(props);
        layer.bindPopup(content);
      });
    }).addTo(map);

  var housePriceLayer = L.mapbox.featureLayer()
    .loadURL('/geojson/imd.geojson').on('ready', function(e) {
      e.target.eachLayer(function(layer) {
        var props = {
            name: layer.feature.properties['LSOA01NM'],
            rank: layer.feature.properties['IMDRANK'],
            gssCode: layer.feature.properties['LSOACODE'],
            globalRank: layer.feature.properties['RANKIMD'],
            averageSale: layer.feature.properties['AVGSALE']
          },
          avgSale = props['averageSale'];
        var colour = (
          avgSale < 140000   ? '#555' :
          avgSale < 169000   ? '#777' :
          avgSale < 208500   ? '#999' :
          avgSale < 275000   ? '#bbb' :
          '#ddd'
        );
        layer.setStyle({
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 0.7,
          fillColor: colour
        });
        var template = JST['hbs/lsoa-info.hbs'];
        var content = template(props);
        layer.bindPopup(content);
      });
    });

    var lbl = L.mapbox.featureLayer()
      .loadURL('/geojson/listed-buildings.geojson')
      .on('ready', function(e) {
        var listedBuildingsCluster = new L.MarkerClusterGroup();
        e.target.eachLayer(function(layer) {
            listedBuildingsCluster.addLayer(layer);
            var template = JST['hbs/listed-building.hbs'],
                props = {
                  name: layer.feature.properties['Name'],
                  grade: layer.feature.properties['Grade'],
                  listedOn: layer.feature.properties['ListDate'],
                  entryNo: layer.feature.properties['ListEntry']
                },
                content = template(props);
            layer.bindPopup(content);
        });
        map.addLayer(listedBuildingsCluster);
      });

    L.control.layers({
      'IMD Rank': IMDScoreLayer,
      'House Prices': housePriceLayer,
    },{
      //'Listed Buildings': listedBuildingsCluster
    }).addTo(map);

    map.legendControl.addLegend(document.getElementById('legend').innerHTML);
});

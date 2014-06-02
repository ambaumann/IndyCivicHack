// Adding 500 Data Points
var map, pointarray, heatmap;
var taxiData = [];



$.getJSON("json_all_accidents.json", function(json) {
    console.log(json[0]);
	for(var i = 0; i<6000; i++) {
		var data = new google.maps.LatLng(json[i][0], json[i][1]);
		taxiData.push(data);
	}
});
console.log(taxiData);

function initialize() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(39.805371,-86.154206),
    mapTypeId: google.maps.MapTypeId.ROAD
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var pointArray = new google.maps.MVCArray(taxiData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

  heatmap.setMap(map);
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 7);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.9);
}

google.maps.event.addDomListener(window, 'load', initialize);
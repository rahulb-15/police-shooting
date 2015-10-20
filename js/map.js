var data; 
var map;
// Function to draw your map
var drawMap = function() {

  // Create map and set view
  map = L.map('map').setView([40, -100], 5)

  // Create a tile layer variable using the appropriate url
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add the layer to your map
  
  layer.addTo(map)

  // Execute your function to get data
 getData();
}

// Function for getting data
var getData = function() {

$.ajax({
  	url: 'data/response.json',
  	type : "get",
  	success: function(dat){
  		data = dat;
  		customBuild();
  	},
  	dataType: "json",
  });


  // Execute an AJAX request to get the data in data/response.js


  // When your request is successful, call your customBuild function

}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	// Be sure to add each layer to the map
var male = new L.LayerGroup([]);
var female = new L.LayerGroup([]);
var unknown = new L.LayerGroup([]);

data.forEach(function(d){
	var latitude = d['lat'];
	var longitude = d['lng'];
	var gender = d["Victim's Gender"];
	var summary = d['Summary'];

	if (gender == 'Male'){
		var circle = new L.circleMarker([latitude, longitude], {color: 'blue',radius:10});
		circle.addTo(male);
		circle.bindPopup(summary);
	} else if (gender == 'Female'){
		var circle = new L.circleMarker([latitude, longitude], {color: 'red', radius:10});
		circle.addTo(female);
		circle.bindPopup(summary);
	} else {
		var circle = new L.circleMarker([latitude, longitude], {color: 'yellow', radius:10});
		circle.addTo(unknown);
		circle.bindPopup(summary);
	}

	male.addTo(map);
	female.addTo(map);
	unknown.addTo(map);
});

	var Sex = {
		"Male": male,
		"Female": female,
		"Unknown": unknown
	};

L.control.layers(null, Sex).addTo(map);

}



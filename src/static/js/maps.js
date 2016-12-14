$(document).ready(function(){
	console.log('MAP MAP MAP')
});

var markers = [];
var uniqueId = 1;


function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: {lat: 52.3702, lng: 4.8952 }
	});

	//__________________SEARCHFIELD START

	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
        	var places = searchBox.getPlaces();

        	if (places.length == 0) {
        		return;
        	}

          // Clear out the old markers.
          markers.forEach(function(marker) {
          	marker.setMap(null);
          });

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
          	if (!place.geometry) {
          		console.log("Returned place contains no geometry");
          		return;
          	}
          	var icon = {
          		url: place.icon,
          		size: new google.maps.Size(71, 71),
          		origin: new google.maps.Point(0, 0),
          		anchor: new google.maps.Point(17, 34),
          		scaledSize: new google.maps.Size(25, 25)
          	};

             // Create a marker for each place.
             markers.push(new google.maps.Marker({
             	map: map,
             	icon: icon,
             	title: place.name,
             	position: place.geometry.location
             }));

             if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
          } else {
          	bounds.extend(place.geometry.location);
          }
      });
          map.fitBounds(bounds);
      });


        	//__________________SEARCHFIELD END



//Attach click event handler to the map.
google.maps.event.addListener(map, 'click', function (e) {

//Determine the location where the user has clicked.
var location = e.latLng;
console.log(location)

// Send to backend
$.post('/dailyLocation',{
	lat: location.lat(),
	lng: location.lng()
} ,(data)=>{
	console.log("YOOO:" +data)
});

//Create a marker and placed it on the map.
var marker = new google.maps.Marker({
	position: location,
	map: map
})

//Set unique id
marker.id = uniqueId;
uniqueId++;

//Attach click event handler to the marker.
google.maps.event.addListener(marker, "click", function (e) {
	var content = "<input id='deLocate' type = 'button' value = 'Delete' onclick = 'DeleteMarker(" + marker.id + ");' value = 'Delete' />";
	var infoWindow = new google.maps.InfoWindow({
		content: content
	});
	infoWindow.open(map, marker);

//On click, sends the marker to backend to be deleted
console.log("DELETEDDD: " + location.lat())
$.post('/deleteLocation', {
	lat: location.lat(),
	lng: location.lng()
},(data)=>{
	console.log("DELETEDDD: " + data)
})
});

//Add marker to the array.
markers.push(marker);

})

}
function DeleteMarker(id) {
//Find and remove the marker from the Array
for (var i = 0; i < markers.length; i++) {
	if (markers[i].id == id) {
//Remove the marker from Map                  
markers[i].setMap(null);

//Remove the marker from array.
markers.splice(i, 1);
return;

}
}

};
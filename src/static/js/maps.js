$(document).ready(function(){
	console.log('MAP MAP MAP')
});

var markers = [];
var uniqueId = 1;


function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		center: {lat: 52.3702, lng: 4.8952 }
	});

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

	   // Create the search box and link it to the UI element.
	   var input = document.getElementById('pac-input');
	   var searchBox = new google.maps.places.SearchBox(input);
	   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
        	searchBox.setBounds(map.getBounds());
        });


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

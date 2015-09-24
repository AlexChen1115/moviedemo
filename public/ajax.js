
$(document).ready(function(){
	$('#submit').click(function(){
		var userinput=$("#inputmovie").val();
		var x = $("#inputmovie");
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.watchPosition(showPosition);
			} else { 
				x.innerHTML = "Geolocation is not supported by this browser.";}
			}
			getLocation(); 
			function showPosition(position) {
				var lat=position.coords.latitude;  
				var lon=position.coords.longitude;
				var geocoder = new google.maps.Geocoder();
				var coord = new google.maps.LatLng(lat,lon);
				geocoder.geocode({'latLng': coord }, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						if (results) {
							var address=results[4].formatted_address;
							$.get("/api/?address="+address+"&movie="+x.val(),function(data){
							});
						}
					}
					else {
						alert("Reverse Geocoding failed because: " + status);
					}
				});
			}
		});

});

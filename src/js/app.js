let directionsService;
let directionsDisplay;

function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  // Create a map object and specify the DOM element for display.
  const map = new google.maps.Map(document.getElementById('map'), {
    center: chicago,
    zoom: 5,
    styles: style,
  });
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute();
}

function calculateAndDisplayRoute() {
        var waypts = [
          {location: 'chicago, il', stopover: true},
          {location: 'portland, or', stopover: true},
          {location: 'seattle ,wa', stopover: true},
        ];

        directionsService.route({
          origin: 'new york, ny',
          destination: 'vancouver, bc',
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

let directionsService;
let directionsDisplay;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: '#660000',
      strokeWeight: 5,
    },
  });
  // Create a map object and specify the DOM element for display.
  const map = new google.maps.Map(document.getElementById('map'), {
    center: chicago,
    zoom: 5,
    styles: style,
  });
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(pacificNorthWest);
}

const calculateAndDisplayRoute = (route) => {
        var waypts = route.slice(1, route.length - 1).map((loc) => {
          return {location: loc};
        });

        directionsService.route({
          origin: route[0],
          destination: route[route.length - 1],
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

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
    center: {lat: 48.12853, lng: -122.787936},
    zoom: 5,
    styles: style,
  });
  directionsDisplay.setMap(map);
  const locationsPromise = loadLocationsMap();
  const routePromise = loadRouteFile();
  $.when(locationsPromise, routePromise).done((locs, route) => {
    const fullRoute = loadFullRoute(locs, route);
    calculateAndDisplayRoute(fullRoute);
  });
}

const loadLocationsMap = () => {
  return $.getJSON('data/locations.json')
      .then((result) => {
        const locs = {};
        result.data.forEach((loc) => {
          locs[loc.id] = new Location(loc.id, loc.name, loc.description, loc.location);
        });
        return locs;
      });
};

const loadRouteFile = () => {
  return $.getJSON('data/routes.json')
      .then((result) => {
        return result.WA.route;
      });
};

const loadFullRoute = (locsMap, routeIds) => {
  return routeIds.map((routeId) => {
    return locsMap[routeId];
  });
}

const loadRoute = (locsMap) => {

}

const calculateAndDisplayRoute = (route) => {
        var waypts = route.slice(1, route.length - 1).map((loc) => {
          return {location: loc.latLng};
        });

        directionsService.route({
          origin: route[0].latLng,
          destination: route[route.length - 1].latLng,
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

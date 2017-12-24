function initMap() {
  // Create a map object and specify the DOM element for display.
  const map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(41.850033, -87.6500523),
    zoom: 5
  });
}

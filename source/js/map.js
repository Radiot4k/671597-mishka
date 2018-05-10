var map;
var coordinates = {lat: 59.938821, lng: 30.323094};

function initMap() {
  map = new google.maps.Map(document.querySelector(".contacts__map-google"), {
    zoom: 16,
    center: coordinates
  });

  var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    optimized: false,
    icon: {url: "./img/icon-map-pin.svg", scaledSize: new google.maps.Size(100, 100)},
    title: "Мишка - милые штуки ручной работы для дома"
  });
};

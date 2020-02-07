var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    accessToken: 'pk.eyJ1IjoibG1odXJzdCIsImEiOiJjazJ3YWU3N3YwMGptM2NsYzJrc3g4dWdnIn0.o23P-xxOlIj-A8bk0KgBPQ',
}).addTo(map);
var myIcon2 = L.icon({
  iconUrl: 'icons8-map-pin-50.png'
})
var control = L.Routing.control({

       waypoints: [
         null
          // L.latLng(47.246587, -122.438830),
          // L.latLng(47.318017, -122.542970)
          //L.latLng(47.318017, -122.542970)
       ],
       show: false,
       units: 'imperial',
       router: L.Routing.mapbox('pk.eyJ1IjoibG1odXJzdCIsImEiOiJjazJ3YWU3N3YwMGptM2NsYzJrc3g4dWdnIn0.o23P-xxOlIj-A8bk0KgBPQ'),
       geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoibG1odXJzdCIsImEiOiJjazJ3YWU3N3YwMGptM2NsYzJrc3g4dWdnIn0.o23P-xxOlIj-A8bk0KgBPQ'),
       collapsible: true,
       routeWhileDragging: true,
   }).addTo(map);
   function createButton(label, container) {
       var btn = L.DomUtil.create('button', '', container);
       btn.setAttribute('type', 'button');
       btn.innerHTML = label;
       return btn;
   }
   map.on('click', function(e) {
       var container = L.DomUtil.create('div'),
           startBtn = createButton('Start from this location', container),
           destBtn = createButton('Go to this location', container);
           L.DomEvent.on(startBtn, 'click', function() {
             control.spliceWaypoints(0, 1, e.latlng);
             map.closePopup();
   });
          L.DomEvent.on(destBtn, 'click', function() {
             control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
             control.show();
             map.closePopup();
   });
       L.popup()
           .setContent(container)
           .setLatLng(e.latlng)
           .openOn(map);
    });
  var myIcon = L.icon({
      iconUrl: 'icons8-street-view-50.png',
      iconAnchor: [20,0],
      iconSize: [40,40]
      })
      function onLocationFound(e) {
          L.marker(e.latlng, {icon: myIcon}).addTo(map)
          .bindPopup("<center><b><h2>You Are Here.</h2></b>" + "Generate directions between two points by clicking on the map (markers can be dragged to reposition).</b></br></br><i>Click on the locator button to recenter to your location.</i>").openPopup();
}
      map.on('locationfound', onLocationFound);
function onLocationError(e) {
      alert(e.message);
}
      map.on('locationerror', onLocationError);
      map.locate({setView: true, maxZoom: 14});

var locationButton = L.easyButton({
    states: [{ //used a tutorial reference state changes for the button and now I'm afraid to mess with some of the callouts...
            stateName: 'find your location',
            icon:      'fa-map-marker',
            title:     'find your location',
            onClick: function(btn, map) {
                map.locate({setView: true, maxZoom: 14});

            }
        },
  ]
});

locationButton.addTo(map);

mapboxgl.accessToken = "pk.eyJ1IjoiYWxhc3RhaXJ0ZWNobm9sb2dpZXMiLCJhIjoiY2tpd2k1NXl3MHIwMzMxbzg2czd3dTRsbCJ9.TL0YU0IyEtIZnOYyKhOVQg";
const map = new mapboxgl.Map({container: "map",style: "mapbox://styles/mapbox/streets-v11",center: [0, 0],zoom: 2}),
 popUp = new mapboxgl.Popup({ closeButton: !1, closeOnClick: !1 });
let interval;

map.on("load", async () => {
  await updateMap();
  interval = setInterval(updateMap, 6e4)
});

async function updateMap() {
  const status = await (await fetch("/status")).json();
  if(status.green) {
    map.addSource("green", status.green);
    map.addLayer({ id: "green", type: "circle", source: "green", paint: { "circle-color": "#00FF00", "circle-radius": 6, "circle-stroke-width": 2, "circle-stroke-color": "#FFFFFF" } });
    map.on("mouseenter", "green", onHover);
    map.on("mouseleave", "green", onLeave);
  }
  if(status.yellow) {
    map.addSource("yellow", status.yellow);
    map.addLayer({ id: "yellow", type: "circle", source: "yellow", paint: { "circle-color": "#F38020", "circle-radius": 6, "circle-stroke-width": 2, "circle-stroke-color": "#FFFFFF" } });
    map.on("mouseenter", "yellow", onHover);
    map.on("mouseleave", "yellow", onLeave);
  }
  if(status.red) {
    map.addSource("red", status.red);
    map.addLayer({ id: "red", type: "circle", source: "red", paint: { "circle-color": "#FF0000", "circle-radius": 6, "circle-stroke-width": 2, "circle-stroke-color": "#FFFFFF" } });
    map.on("mouseenter", "red", onHover);
    map.on("mouseleave", "red", onLeave);
  }
}

function onHover(colo) {
  map.getCanvas().style.cursor = "pointer";
  const coords = colo.features[0].geometry.coordinates.slice(),
    description = colo.features[0].properties.description;
  for (; Math.abs(colo.lngLat.lng - coords[0]) > 180; ) coords[0] += colo.lngLat.lng > a[0] ? 360 : -360;
  popUp.setLngLat(coords).setHTML(description).addTo(map);
}

function onLeave() {
  map.getCanvas().style.cursor = "";
  popUp.remove();
}
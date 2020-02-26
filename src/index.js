import "./styles.css";
import L from "leaflet";
import img from "./map.png";

const map = L.map("mapid", {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 1
});

const HEIGHT = 1754;
const WIDTH = 2481;

const bounds = [[0, 0], [HEIGHT, WIDTH]];
L.imageOverlay(img, bounds).addTo(map);

map.fitBounds(bounds);
map.setView([1000, 520], 0);

const people = [
  {
    name: "Milan",
    lat: HEIGHT - 687,
    lng: 253
  },
  {
    name: "Majo",
    lat: HEIGHT - 747,
    lng: 253,
    hidden: false
  }
];

const popup = name =>
  L.popup().setContent(
    `<p>Hello ${name || "world"}!<br />This is a nice popup.</p>`
  );

var avatarIcon = L.divIcon({
  html:
    "<img src='https://avatars3.githubusercontent.com/u/2865988?v=4' class='avatar-icon' />"
});

people.forEach(person => {
  L.marker(L.latLng([person.lat, person.lng]), { icon: avatarIcon })
    .addTo(map)
    .bindPopup(popup(person.name))
    .setOpacity(person.hidden ? 0.3 : 1);
});

// create a red polygon from an array of LatLng points
var latlngs = [
  [
    [HEIGHT - 656, 218],
    [HEIGHT - 656, 328],
    [HEIGHT - 796, 328],
    [HEIGHT - 796, 218]
  ],
  [
    [HEIGHT - 656, 328],
    [HEIGHT - 656, 408],
    [HEIGHT - 796, 408],
    [HEIGHT - 796, 328]
  ],
  [
    [HEIGHT - 656, 778],
    [HEIGHT - 656, 888],
    [HEIGHT - 780, 888],
    [HEIGHT - 780, 778]
  ],
  [
    [HEIGHT - 656, 888],
    [HEIGHT - 656, 968],
    [HEIGHT - 780, 968],
    [HEIGHT - 780, 888]
  ]
];
// var polygon = L.polygon(latlngs, { color: "red", opacity: 0.5 }).addTo(map);

var myIcon = L.divIcon({ className: "my-div-icon" });
// you can set .my-div-icon styles in CSS
// L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
const names = ["office a", "office b", "office c", "office d"];
latlngs.forEach((latlng, index) => {
  const polygon = L.polygon(latlng, { color: "green" });
  polygon
    .addTo(map)
    .bindTooltip(names[index], { permanent: false, direction: "top" });
  const center = polygon.getCenter();
  const marker = L.marker(center, { icon: myIcon });
  marker.addTo(map);
});

// zoom the map to the polygon
// map.fitBounds(polygon.getBounds());

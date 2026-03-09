// -----------------------------
// Map initialization
// -----------------------------
const map = L.map("map").setView([-33.457925, -70.664511], 7);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);


// -----------------------------
// Marker utility
// -----------------------------
function createMarker(lat, lng, color, popupContent) {

  const marker = L.circleMarker([lat, lng], {
    radius: 8,
    color: color,
    fillColor: color,
    fillOpacity: 0.9
  }).addTo(map);

  marker.bindPopup(popupContent);
}


// -----------------------------
// Coordinate offset logic
// prevents markers overlapping
// -----------------------------
function adjustCoordinates(lat, lng, commune, communeTracker){

  if (commune in communeTracker) {

    const offset = communeTracker[commune];

    lat = lat - offset * 0.001;
    lng = lng - offset * 0.0000005;

    communeTracker[commune] += 1;

  } else {
    communeTracker[commune] = 1;
  }

  return [lat, lng];
}


// -----------------------------
// Fetch map data
// -----------------------------
fetch("http://localhost:5000/obtener-mapa")
  .then(response => response.json())
  .then(data => {

    const orders = data[0];
    const donations = data[1];

    const communeTracker = {};

    renderOrders(orders, communeTracker);
    renderDonations(donations, communeTracker);

  });


// -----------------------------
// Render orders
// -----------------------------
function renderOrders(orders, communeTracker){

  for (const ord of orders){

    let lat = parseFloat(ord["lat_pedido"]);
    let lng = parseFloat(ord["lng_pedido"]);
    const commune = ord["comuna_pedido"];

    [lat, lng] = adjustCoordinates(lat, lng, commune, communeTracker);

    const popupContent = `
      <h4>ID Pedido: ${ord["id_pedido"]}</h4>
      <ul>
        <li><b>Tipo:</b> ${ord["tipo_pedido"]}</li>
        <li><b>Cantidad:</b> ${ord["cantidad_pedido"]}</li>
        <li><b>Email:</b> ${ord["email_pedido"]}</li>
      </ul>
    `;

    createMarker(lat, lng, "#FE5F55", popupContent);
  }

}


// -----------------------------
// Render donations
// -----------------------------
function renderDonations(donations, communeTracker){

  for (const don of donations){

    let lat = parseFloat(don["lat_donacion"]);
    let lng = parseFloat(don["lng_donacion"]);
    const commune = don["comuna_donacion"];

    [lat, lng] = adjustCoordinates(lat, lng, commune, communeTracker);

    const popupContent = `
      <h4>ID Donación: ${don["id_donacion"]}</h4>
      <ul>
        <li><b>Tipo:</b> ${don["tipo_donacion"]}</li>
        <li><b>Cantidad:</b> ${don["cantidad_donacion"]}</li>
        <li><b>Email:</b> ${don["email_donacion"]}</li>
        <li><b>Fecha disponibilidad:</b> ${don["fecha_donacion"]}</li>
        <li><b>Dirección:</b> ${don["calle_numero"]}</li>
      </ul>
    `;

    createMarker(lat, lng, "#94C9A9", popupContent);
  }

}
let map = L.map("map").setView([-33.457925, -70.664511], 7);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

fetch("http://localhost:5000/obtener-mapa")
  .then((response) => response.json())
  .then((data) => {
    const comunas = {};
    let pedidos = data[0]
    let donaciones = data[1]
    let i = 0;

    for(let ped of pedidos){
      let lat_p = ped["lat_pedido"];
      let lng_p = ped["lng_pedido"];
      let comuna_p = ped["comuna_pedido"];

      console.log(comunas)

      //si una comuna ya está se le ajustan un poco las coordenadas para que se puedan distinguir los pedidos/donaciones.
      if(comuna_p in comunas) {
        lat_p = String(parseFloat(lat_p) - comunas[comuna_p]*0.001);
        lng_p = String(parseFloat(lng_p) - comunas[comuna_p]*0.0000005);
        comunas[comuna_p] += 1;
      } else {
        comunas[comuna_p] = 1;
      }

      const onMarkerClickPedido = (e) => {
        L.popup()
          .setLatLng([lat_p, lng_p])
          .setContent(
            `<h1>ID Pedido: ${ped["id_pedido"]}</h1><ul><li>Tipo: ${ped["tipo_pedido"]}</li><li>Cantidad: ${ped["cantidad_pedido"]}</li><li>Email Solicitante: ${ped["email_pedido"]}</li></ui>`
          )
          .openOn(map);
      };

      let marker = L.marker([lat_p, lng_p]).addTo(map);
      marker.on("click", onMarkerClickPedido);
    };
    
    for(let don of donaciones){
      let lat_d = don["lat_donacion"];
      let lng_d = don["lng_donacion"];
      let comuna_d = don["comuna_donacion"];

      //si una comuna ya está se le ajustan un poco las coordenadas para que se puedan distinguir los pedidos/donaciones.
      if(comuna_d in comunas) {
        lat_d = String(parseFloat(lat_d) - comunas[comuna_d]*0.001);
        lng_d = String(parseFloat(lng_d) - comunas[comuna_d]*0.0000005);
        comunas[comuna_d] +=1;
      } else {
        comunas[comuna_d] = 1;
      }

      const onMarkerClickDonacion = (e) => {
        L.popup()
          .setLatLng([lat_d, lng_d])
          .setContent(
            `<h1>ID Donacion: ${don["id_donacion"]}</h1><ul><li>Tipo: ${don["tipo_donacion"]}</li><li>Cantidad: ${don["cantidad_donacion"]}</li><li>Email Solicitante: ${don["email_donacion"]}</li><li>Fecha Disponibilidad: ${don["fecha_donacion"]}</li><li>Calle y Número: ${don["calle_numero"]}</li></ui>`
          )
          .openOn(map);
      };

      let markerd = L.marker([lat_d, lng_d],{
        icon: L.icon({
          iconUrl: "../static/img/green-icon.png",
          iconSize : [30, 50],
          iconAnchor: [20, 41],
        })
      }).addTo(map);

      markerd.on("click", onMarkerClickDonacion);
    };
  });
// Funciones de los botones para moverse entre páginas

function irDonacion(){
  location.href = "../html/agregar-donacion.html";
};
function irPedidos(){
  location.href = "../html/agregar-pedido.html";
};
function irVerDonaciones(){
  location.href = "../html/ver-donaciones.html";
};
function irVerPedidos(){
  location.href = "../html/ver-pedidos.html";
};
function irInicio(){
  location.href = "../html/inicio.html";
};
function irInfoDonacion(){
  location.href = "../html/informacion-donacion.html";
};
function irInfoPedido(){
  location.href = "../html/informacion-pedido.html";
};

//informacion-donacion.html
function aumentar(foto){
  if(foto.width == "640"){
    foto.style.width = "1280px";
    foto.style.height = "1024px"
  } else if(foto.width == "1280"){
    foto.style.width = "640px";
    foto.style.height = "480px";
  } 
};



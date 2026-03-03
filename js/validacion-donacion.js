// Validación del formulario de donaciones

const validarEmail = (email) => {
  if(!email) return false;

  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formato = re.test(email);

  return formato;
};

const validarCelular = (celular) => {
  if(!celular) return false;

  let largoValido = (celular.length === 9);

  let re = /^[0-9]+$/;
  let formato = re.test(celular);

  return largoValido && formato;
};

const validarRegion = (region) => {
  return(region);
};

const validarComuna = (comuna) => {
  return(comuna);
};

const validarCalle = (calle) => {
  if(!calle) return false;
  return (calle.length >= 3);
};

const validarTipo = (tipo) => {
  return(tipo);
};

const validarCantidad = (cantidad) => {
  return (cantidad);
};

const validarFecha = (fecha) => {
  if(!fecha) return false;

  largoValido = (fecha.length == 10);

  let re = /^[0-9][0-9][0-9][0-9][-]+[0-9][0-9]+[-][0-9][0-9]$/
  let formato = re.test(fecha);
  
  if (!formato || !largoValido) return false;
  let esValida = true;

  //fecha ingresada
  let arrFecha= fecha.split("-");
  let anno = parseInt(arrFecha[0]);
  let mes = parseInt(arrFecha[1]);
  let dia = parseInt(arrFecha[2]);

  if(dia == 31 && mes in [2, 4, 6, 9, 11]) esValida = false;
  
  if(dia == 30 && mes == 2) esValida = false;
  
  let fechaIngresada = new Date(anno, mes-1, dia);
  let fechaActual = new Date();

  if(fechaIngresada < fechaActual) esValida = false;
  
  return esValida;
};

const validarNombre = (nombre) => {
  if(!nombre) return false;

  let largoValido = nombre.length >= 3 && nombre.length <= 80;
  
  let re = /^[a-zA-Z]+[a-zA-z|\s]+$/;
  let formato = re.test(nombre);

  return formato && largoValido;
};

const validarFoto = (foto1, foto2, foto3) => {
  if(!(foto1 || foto2 || foto3)) return false;
  
  let esValida = true;
  
  if (foto1){
    tipoArchivo = foto1.type.split("/")[0];
    esValida = (esValida && tipoArchivo == "image") || (esValida && foto1.type == "application/pdf");
  }

  if (foto2){
    tipoArchivo = foto2.type.split("/")[0];
    esValida = (esValida && tipoArchivo == "image") || (esValida && foto2.type == "application/pdf");
  }

  if (foto3){
    tipoArchivo = foto3.type.split("/")[0];
    esValida = (esValida && tipoArchivo == "image") || (esValida && foto3.type == "application/pdf");
  }

  return esValida;
};

function irInicio(){
  location.href = "../html/inicio.html";
};

const validateForm = () => {
  let myForm = document.forms["login-form"];
  let nombre = myForm["nombre"].value;
  let email = myForm["email"].value;
  let celular = myForm["celular"].value;
  let region = myForm["region"].value;
  let comuna = myForm["comuna"].value;
  let calle = myForm["calle-numero"].value;
  let tipo = myForm["tipo"].value;
  let cantidad = myForm["cantidad"].value;
  let fecha = myForm["fecha-disponibilidad"].value;
  let foto1 = myForm["foto-1"].files[0];
  let foto2 = myForm["foto-2"].files[0];
  let foto3 = myForm["foto-3"].files[0];

  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };
  
  if(!validarNombre(nombre)){
    setInvalidInput("Nombre");
  }
  if(!validarEmail(email)){
    setInvalidInput("Email");
  }
  if(!validarCelular(celular)){
    setInvalidInput("Celular");
  }
  if(!validarRegion(region)){
    setInvalidInput("Región: Debe seleccionar una");
  }
  if(!validarComuna(comuna)){
    setInvalidInput("Comuna: Debe seleccionar una");
  }
  if(!validarCalle(calle)){
    setInvalidInput("Calle y Número");
  }
  if(!validarTipo(tipo)){
    setInvalidInput("Tipo: Debe seleccionar uno");
  }
  if(!validarCantidad(cantidad)){
    setInvalidInput("Cantidad");
  }
  if(!validarFecha(fecha)){
    setInvalidInput("Fecha: Debe ser AAAA-MM-DD");
  }
  if(!validarFoto(foto1, foto2, foto3)){
    setInvalidInput("Foto(s): Debe ingresar al menos una");
  }

  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  if (!isValid) {
    validationListElem.textContent = "";
    // add invalid elements to val-list element.
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    // set val-msg
    validationMessageElem.innerText = "Los siguiente campos son invalidos:";

    // make validation prompt visible
    validationBox.hidden = false;
    window.scrollTo(0, 0);

  } else {
    let msg = document.getElementById("msg");
    let conf = document.getElementById("confirmar");
    let btn_envio = document.getElementById("envio");
    let si = document.getElementById("si");
    let no = document.getElementById("no");
    let volver = document.getElementById("volver");

    btn_envio.hidden = true;
    conf.hidden = false;

    no.addEventListener("click", function(){
      conf.hidden = true;
      btn_envio.hidden = false;
    });

    myForm.addEventListener("submit", function(event){
      msg.innerHTML = "Hemos recibido la información de su donación. Muchas gracias.";
      si.hidden = true;
      no.hidden = true;
      volver.hidden = false;
      event.preventDefault();
    });
  }
};

let submitBtn = document.getElementById("envio");
submitBtn.addEventListener("click", validateForm);


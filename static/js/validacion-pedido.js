// Validación del formulario de pedidos

const validarEmail = (email) => {
    if(!email) return false;
  
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formato = re.test(email);
  
    return formato;
  };
  
  const validarCelular = (celular) => {  
    if(!celular) return true;

    largoValido = (celular.length == 9);
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
  
  const validarTipo = (tipo) => {
    return(tipo);
  };
  
  const validarCantidad = (cantidad) => {
    return (cantidad);
  };
  
  const validarNombre = (nombre) => {
    if(!nombre) return false;
  
    let largoValido = nombre.length >= 3 && nombre.length <= 80;
    
    let re = /^[a-zA-Z]+[a-zA-z|\s]+$/;
    let formato = re.test(nombre);
  
    return formato && largoValido;
  };
  
  const validarDescripcion = (descripcion) => {
    if(!descripcion) return false;
    return (descripcion.length <= 250); 
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
    let tipo = myForm["tipo"].value;
    let descripcion = myForm["descripcion"].value;
    let cantidad = myForm["cantidad"].value;
  
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
    if(!validarTipo(tipo)){
      setInvalidInput("Tipo: Debe seleccionar uno");
    }
    if(!validarDescripcion(descripcion)){
      setInvalidInput("Descripción");
    }
    if(!validarCantidad(cantidad)){
      setInvalidInput("Cantidad");
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
      let conf = document.getElementById("confirmar");
      let btn_envio = document.getElementById("envio");
      let no = document.getElementById("no");
  
      btn_envio.hidden = true;
      conf.hidden = false;
  
      no.addEventListener("click", function(){
        conf.hidden = true;
        btn_envio.hidden = false;
      });
    }
  };
  
  let submitBtn = document.getElementById("envio");
  submitBtn.addEventListener("click", validateForm);

  function aumentar(foto){
    if(foto.width == "640"){
      foto.style.width = "1280px";
      foto.style.height = "1024px"
    } else if(foto.width == "1280"){
      foto.style.width = "640px";
      foto.style.height = "480px";
    } 
  };
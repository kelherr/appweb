// Validación del formulario de donaciones

const validarEmail = (email) => {
  if (!email) return false;
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
};

const validarCelular = (celular) => {
  if (!celular) return false;

  let largoValido = celular.length === 9;
  let re = /^[0-9]+$/;

  return largoValido && re.test(celular);
};

const validarRegion = (region) => {
  return region !== "";
};

const validarComuna = (comuna) => {
  return comuna !== "";
};

const validarCalle = (calle) => {
  if (!calle) return false;
  return calle.length >= 3;
};

const validarTipo = (tipo) => {
  return tipo !== "";
};

const validarCantidad = (cantidad) => {
  if (!cantidad) return false;

  let re = /^[0-9]+\s?[a-zA-Z]+$/;
  return re.test(cantidad);
};

const validarFecha = (fecha) => {
  if (!fecha) return false;

  let re = /^\d{4}-\d{2}-\d{2}$/;
  if (!re.test(fecha)) return false;

  let fechaIngresada = new Date(fecha);
  let fechaActual = new Date();

  fechaActual.setHours(0,0,0,0);

  return fechaIngresada >= fechaActual;
};

const validarNombre = (nombre) => {
  if (!nombre) return false;

  let largoValido = nombre.length >= 3 && nombre.length <= 80;
  let re = /^[a-zA-Z\s]+$/;

  return largoValido && re.test(nombre);
};

const validarFoto = (foto1, foto2, foto3) => {

  if (!(foto1 || foto2 || foto3)) return false;

  let esValida = true;

  if (foto1) {
    let tipoArchivo = foto1.type.split("/")[0];
    esValida = esValida && tipoArchivo === "image";
  }

  if (foto2) {
    let tipoArchivo = foto2.type.split("/")[0];
    esValida = esValida && tipoArchivo === "image";
  }

  if (foto3) {
    let tipoArchivo = foto3.type.split("/")[0];
    esValida = esValida && tipoArchivo === "image";
  }

  return esValida;
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
    isValid = false;
  };

  if (!validarNombre(nombre)) setInvalidInput("Nombre");
  if (!validarEmail(email)) setInvalidInput("Email");
  if (!validarCelular(celular)) setInvalidInput("Celular");
  if (!validarRegion(region)) setInvalidInput("Región: Debe seleccionar una");
  if (!validarComuna(comuna)) setInvalidInput("Comuna: Debe seleccionar una");
  if (!validarCalle(calle)) setInvalidInput("Calle y Número");
  if (!validarTipo(tipo)) setInvalidInput("Tipo: Debe seleccionar uno");
  if (!validarCantidad(cantidad)) setInvalidInput("Cantidad");
  if (!validarFecha(fecha)) setInvalidInput("Fecha: Debe ser AAAA-MM-DD y no pasada");
  if (!validarFoto(foto1, foto2, foto3)) setInvalidInput("Foto(s): Debe ingresar al menos una");



  // SI HAY ERRORES
  if (!isValid) {

    let listaErrores = "<ul style='text-align:left;'>";

    for (let input of invalidInputs) {
      listaErrores += `<li>${input}</li>`;
    }

    listaErrores += "</ul>";

    Swal.fire({
      title: "Formulario con errores",
      icon: "error",
      html: `
        <p>Los siguientes campos están incorrectos:</p>
        ${listaErrores}
      `,
      confirmButtonText: "Revisar formulario"
    });

  } 

  // SI TODO ESTÁ CORRECTO
  else {

    Swal.fire({
      title: "Confirmar donación",
      text: "¿Está seguro de que desea agregar esta donación?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
    }).then((result) => {

    if (result.isConfirmed) {

      Swal.fire({
        title: "Donación Registrada",
        text: "Su donación ha sido enviada correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        myForm.submit();
      }, 2000);

    }

    });

  }

};
let submitBtn = document.getElementById("envio");
submitBtn.addEventListener("click", validateForm);

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
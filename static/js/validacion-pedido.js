// Validación del formulario de pedidos

const validarEmail = (email) => {
  if (!email) return false;

  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
};

const validarCelular = (celular) => {
  if (!celular) return true; // opcional

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

const validarTipo = (tipo) => {
  return tipo !== "";
};

const validarCantidad = (cantidad) => {
  if (!cantidad) return false;

  let re = /^[0-9]+\s?(kg|g|unidad|unidades|cajas)?$/i;
  return re.test(cantidad);
};

const validarNombre = (nombre) => {
  if (!nombre) return false;

  let largoValido = nombre.length >= 3 && nombre.length <= 80;
  let re = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;

  return largoValido && re.test(nombre);
};

const validarDescripcion = (descripcion) => {
  if (!descripcion) return false;
  return descripcion.length <= 250;
};

function irInicio(){
  location.href = "/";
}

const validateForm = (event) => {

  event.preventDefault();

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

  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
  };

  if (!validarNombre(nombre)) {
    setInvalidInput("Nombre (mínimo 3 caracteres)");
  }

  if (!validarEmail(email)) {
    setInvalidInput("Email inválido");
  }

  if (!validarCelular(celular)) {
    setInvalidInput("Celular (debe tener 9 dígitos)");
  }

  if (!validarRegion(region)) {
    setInvalidInput("Región (debe seleccionar una)");
  }

  if (!validarComuna(comuna)) {
    setInvalidInput("Comuna (debe seleccionar una)");
  }

  if (!validarTipo(tipo)) {
    setInvalidInput("Tipo de alimento");
  }

  if (!validarDescripcion(descripcion)) {
    setInvalidInput("Descripción (máximo 250 caracteres)");
  }

  if (!validarCantidad(cantidad)) {
    setInvalidInput("Cantidad (ej: 2 kg, 5 unidades)");
  }

  // Si hay errores
  if (invalidInputs.length > 0) {

    let listaErrores = "<ul style='text-align:left'>";

    invalidInputs.forEach((error) => {
      listaErrores += `<li>${error}</li>`;
    });

    listaErrores += "</ul>";

    Swal.fire({
      title: "Formulario con errores",
      html: listaErrores,
      icon: "error",
      confirmButtonText: "Corregir"
    });

    return;
  }

  // Confirmación antes de enviar

  Swal.fire({
    title: "¿Confirmar pedido?",
    text: "¿Desea registrar este pedido?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, enviar",
    cancelButtonText: "Cancelar"
  }).then((result) => {

    if (result.isConfirmed) {

      Swal.fire({
        title: "Pedido registrado",
        text: "Su pedido ha sido enviado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        myForm.submit();
      }, 2000);

    }

  });

};

let submitBtn = document.getElementById("envio");

if (submitBtn) {
  submitBtn.addEventListener("click", validateForm);
;}
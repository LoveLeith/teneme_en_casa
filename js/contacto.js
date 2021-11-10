//Función para validar formulario de contacto antes de enviarlo al servidor, evitar perder la información y poder procesarla con JS
let formularioContacto = document.getElementById('formulario');
function validarFormulario(e) {
    e.preventDefault();
}

formularioContacto.addEventListener('submit', validarFormulario);
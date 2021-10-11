

//Esta es una función para validar el formulario antes de enviarlo al servidor y para 
//evitar perder la información y así procesarla con JS
let formularioContacto = document.getElementById('formulario');

function validarFormulario(e) {
    e.preventDefault();
}

formularioContacto.addEventListener('submit', validarFormulario);




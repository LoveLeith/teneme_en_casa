//Función para validar formulario de contacto antes de enviarlo al servidor, evitar perder la información y poder procesarla con JS
let formularioContacto = document.getElementById('formulario');
function validarFormulario(e) {
    e.preventDefault();
    Toastify({
        text: "Formulario enviado con éxito",
        duration: 1500,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
        background: "black",
        },
        onClick: function(){}
    }).showToast();
    
    document.getElementById("formulario").reset();
}

formularioContacto.addEventListener('submit', validarFormulario);






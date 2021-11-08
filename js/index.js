//Método Hide para ocultar todo lo que está en el div productosContenedor
$('#productosContenedor').hide();

//Método GET para recuperar los datos del archivo JSON
$.get("../data/productos.json", function (respuesta, estado) {
    if(estado == "success"){
        for (const objeto of respuesta) {
            productos.push(new Producto(objeto.id, objeto.nombre, objeto.precio, objeto.img, objeto.categoria, objeto.cantidad));
        }
        //Llamada a la funcion productosUI para generar la interfaz de productos
        productosUI(productos, '#productosContenedor'); 
    }
    else {
        console.log('Los datos no se cargaron correctamente');
    }
});

//Función para recuperar los datos de los productos del localStorage y que se rendericen en el carrito
$(document).ready(function() {              
        if ('carrito' in localStorage) {
        const datos = JSON.parse(localStorage.getItem('carrito'));
        for (const objeto of datos) {
            carrito.push(new Producto(objeto.id, objeto.nombre, objeto.precio, objeto.img, objeto.categoria, objeto.cantidad));
        }
        carritoUI(carrito);
    }
});

$(window).on('load', function () {
    //Quitamos los productos de la pagina para que luego vayan apareciendo con el fadeIn posterior
    $("#espera").remove();
    //Agrego fadeIn para que se muestren los productos ocultos
    $('#productosContenedor').fadeIn(1500, function () {
    }); 
});

//ESTA ES LA LLAMADA PARA EL FILTRO POR CATEGORIAS
selectUI(categorias, "#selectCategoria");
//Asocio el evento change al select
$("#selectCategoria").on("change", buscarCategoria);


//FUNCIONALIDAD PARA LOS ENLACES DE SCROLL HACIA ABAJO
$("#abajo").click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('.piePagina').offset().top
    }, 1500);   
})

//FUNCIONALIDAD PARA ENLACE DE SCROLL HACIA ARRIBA
$("#arriba").click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('header').offset().top
    }, 1500);
})

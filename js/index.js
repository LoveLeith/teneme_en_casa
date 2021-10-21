//Uso el método Hide para ocultar todo lo que está en el div productosContenedor
$('#productosContenedor').hide();

$.get("../data/productos.json", function (respuesta, estado) {
    //console.dir(respuesta);
    //console.log(estado);
    //Pregunto si el estado de la operacion fue exitoso
    if(estado == "success"){
        //Recorro el array de respuesta y los transformo a objetos de tipo "producto"
        for (const objeto of respuesta) {
            console.dir(objeto);
            //Agrego un push para usar los metodos de la clase constructora
            productos.push(new Producto(objeto.id, objeto.nombre, objeto.precio, objeto.img, objeto.categoria, objeto.cantidad));
            console.dir(productos[0]);
        }
        //Llamada de la funcion productosUI para generar la interfaz de productos con una funcion
        productosUI(productos, '#productosContenedor'); 
    }
    else {
        console.log('Los datos no se cargaron correctamente');
    }
});

//Funcion para que el DOM cargue primero todas las cards con los botones y garantizar que los botones funcionen correctamente
$(document).ready(function() {              
    console.log('Dom listo');
});

$(window).on('load', function () {
    //Quitamos los productos de la pagina para que luego vayan apareciendo con el fadeIn posterior
    $("#espera").remove();
    //Agrego fadeIn para que se muestren los productos ocultos
    $('#productosContenedor').fadeIn(1500, function () {
        console.log('Funcionalidad callback');
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

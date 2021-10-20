//Instancio objetos y asocio al array global (id, nombre, precio, img, categoria)
productos.push(new Producto(1, "Hamburguesa clásica", 300, "hamburguesa", categorias[0]));
productos.push(new Producto(1, "Hamburguesa mediana", 300, "hamburguesa", categorias[0]));
productos.push(new Producto(1, "Hamburguesa grande", 300, "hamburguesa", categorias[0]));
productos.push(new Producto(2, "Papas fritas horneables", 450, "papas", categorias[1]));
productos.push(new Producto(2, "Papas fritas crinkle", 450, "papas", categorias[1]));
productos.push(new Producto(2, "Papas fritas clásicas", 450, "papas", categorias[1]));
productos.push(new Producto(3, "Helado de vainilla", 500, "helado", categorias[2]));
productos.push(new Producto(3, "Helado de chocolate", 500, "helado", categorias[2]));
productos.push(new Producto(3, "Helado de frutilla", 500, "helado", categorias[2]));
productos.push(new Producto(4, "Facturas - Medialunas", 300, "facturas", categorias[3]));
productos.push(new Producto(4, "Facturas - Circulares", 300, "facturas", categorias[3]));
productos.push(new Producto(4, "Facturas - Criollitos", 300, "facturas", categorias[3]));

$('#productosContenedor').hide();

//Llamada de la funcion productosUI para generar la interfaz de productos con una funcion
productosUI(productos, '#productosContenedor');  

//Funcion para que el DOM cargue primero todas las cards con los botones y garantizar que los botones funcionen correctamente
$(document).ready(function() {              
    console.log('Dom listo');
});

$(window).on('load', function () {
    $("#espera").remove();
    $('#productosContenedor').fadeIn(1500); 
});

//ESTA ES LA LLAMADA PARA EL FILTRO POR CATEGORIAS
selectUI(categorias, "#selectCategoria");
$("#selectCategoria").on("change", buscarCategoria);


//FUNCIONALIDAD PARA LOS ENLACES DE SCROLL HACIA ABAJO -- SI ESTA FUNCION NO FUNCIONA, LLEVARLA ADENTRO DE "READY()"
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

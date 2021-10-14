//Instancio objetos y asocio al array global

productos.push(new Producto(1, "Hamburguesa", 300, "hamburguesa"));
productos.push(new Producto(2, "Papas fritas", 450, "papas"));
productos.push(new Producto(3, "Helado de vainilla", 500, "helado"));
productos.push(new Producto(4, "Facturas", 300, "facturas"));

//Llamada de la funcion productosUI para generar la interfaz de productos con una funcion
productosUI(productos, '#productosContenedor');  

//Funcion para que el DOM cargue primero todas las cards con los botones y garantizar que los botones funcionen correctamente
$(document).ready(function() {              
    console.log('Dom listo');
    $(".btn-compra").click(comprarProducto);
});

$(window).on('load', function () {
    $("#espera").remove()
});
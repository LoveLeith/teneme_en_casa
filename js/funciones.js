//Funcion para generar la interfaz de productos con las cards

function productosUI(productos, id) {
    $(id).empty(); 
    for(const producto of productos) {
        $(id).append(`<div class="card tarjetas" style="width: 18rem;">
                                            <img src="../assets/images/${producto.img}.jpg" class="card-img-top" alt="Imagen producto">
                                            <div class="card-body cuerpoTarjetas">
                                                <h5 class="card-title tituloTarjetas">${producto.nombre}</h5>
                                                <p class="card-text precioTarjetas">$${producto.precio}</p>
                                                <span class = "badge badge-warning">${producto.categoria}</span>
                                                <a href="#" id="${producto.id} "class="btn btn-primary btn-compra">Comprar</a> 
                                            </div>
                                            </div>`);
    }
    $(".btn-compra").click(comprarProducto);
}

//Funcion manejador de compra de productos
function comprarProducto(event) {
    //Prevengo el refresh al presionar enlaces para impedir que al hacer clic en "Comprar" la pantalla se vaya para arriba
    event.preventDefault();
    //Funcion para obtener el ID del boton presionado
    const idProducto = event.target.id;
    //Funcion para obtener el objeto del producto correspondiente al ID
    const existe = carrito.find(producto => producto.id == idProducto);
    if (existe == undefined) {
        const seleccionado = productos.find(producto => producto.id == idProducto);
        localStorage.setItem('idProducto', JSON.stringify(seleccionado)); 
        carrito.push(seleccionado);
    } else {
        existe.agregarCantidad(1);
    }
    carritoUI(carrito);
}

//Funcion para configurar la parte visual del carrito y que ahi se vean los productos seleccionados
function carritoUI(productos) {
    //Funcion para cambiar el interior del indicador de cantidad de productos
    $("#cantidadCarrito").html(productos.length);  
    //Funcion para vaciar el interior del cuerpo del carrito para que no se repitan los productos
    $("#carritoProductos").empty(); 
    for (const producto of productos) {
        $('#carritoProductos').append(`<p> ${producto.nombre}
                                        <span class = "badge badge-warning">
                                        ${producto.precio}</span>
                                        <span class = "badge badge-warning">
                                        Cantidad: ${producto.cantidad}</span>
                                        <span class = "badge badge-warning">
                                        Subtotal: $${producto.subtotal()}</span>
                                        </p>`);
    }

}

//Esta funcion es para crear la interfaz dinamica para seleccionar las categorias
function selectUI(lista, selector) {  
    $(selector).empty();
    for (const categoria of lista) {
        $(selector).append(`<option>${categoria}</option>`);
    }
    $(selector).prepend(`<option selected>TODOS</option>`); 
}

//Esta es una funcion para filtrar por categorias y para mostrar todos los productos en caso de seleccionar la opcion TODOS
function buscarCategoria() { 
    let valor = this.value; 
    $("#productosContenedor").fadeOut(2000, function() {  
        if (valor != "TODOS") {
            let filtrados = productos.filter(producto => producto.categoria == valor);
            console.log(filtrados);
            productosUI(filtrados, "#productosContenedor");
        }
        else {
            productosUI(productos, "#productosContenedor");
        }
    }).fadeIn(2000);
}

//Esta es una función para validar el formulario antes de enviarlo al servidor y para 
//evitar perder la información y así procesarla con JS
let formularioContacto = document.getElementById('formulario');
function validarFormulario(e) {
    e.preventDefault();
}

formularioContacto.addEventListener('submit', validarFormulario);




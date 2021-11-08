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
    event.preventDefault();
    //Funcion para obtener el ID del boton presionado
    const idProducto = event.target.id;
    //Funcion para obtener el objeto del producto correspondiente al ID
    const existe = carrito.find(producto => producto.id == idProducto);

    if (existe == undefined) {
        const seleccionado = productos.find(producto => producto.id == idProducto);
        carrito.push(seleccionado);
        actualizarPrecio();
    } else {
        existe.agregarCantidad(1);
        actualizarPrecio();
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    carritoUI(carrito);
}

//Funcion para la renderización de los productos en el carrito
function carritoUI(productos) {
    //Funcion para cambiar el indicador de cantidad de productos
    $("#cantidadCarrito").html(productos.length);
    //Funcion para vaciar el interior del cuerpo del carrito para que no se repitan los productos
    $("#containerProductos").empty();       
        for (const producto of productos) {
            let tr = document.createElement('tr')
            tr.innerHTML+=
                            `<td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td><button id="${producto.id}" class="btn-dark btn-add btn-add${producto.id}"> + </button>
                            <span class="badge badge-warning" id="counter${producto.id}">${producto.cantidad}</span>
                            <button id="${producto.id}" class="btn-dark btn-sub btn-sub${producto.id}"> - </button>
                            <button id="${producto.id}" class="btn-dark btn-delete btn-delete${producto.id}"> x </button>
                            <span class="badge badge-warning">Subtotal: $${producto.subtotal()}</span></td>`          
            document.getElementById('containerProductos').appendChild(tr);
            actualizarPrecio();     
        }
    
    //Llamada a la funcion para eliminar productos del carrito
    $('.btn-delete').on('click', eliminarCarrito);

    //Funcion para eliminar los productos del carrito
    function eliminarCarrito(event) {
        event.stopPropagation();
        //Filtro donde voy a sobreescribir el array carrito con todos los productos menos el producto del id del target.
        carrito = carrito.filter(producto => producto.id != event.target.id);
        carritoUI(carrito);
        actualizarPrecio();
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
    }

    //Llamada a la funcion para agregar productos del carrito
    $('.btn-add').on('click', agregarCarrito);

    //Funcion para agregar cantidad de productos al carrito
    function agregarCarrito(event) {
        event.stopPropagation();
        let producto = carrito.find(producto => producto.id == event.target.id);
        producto.agregarCantidad(1);
        //Me posiciono sobre el elemento padre para ver elementos hijos del carrito y modificar cantidad productos y subtotal
        $(this).parent().children()[1].innerHTML = producto.cantidad;
        $(this).parent().children()[4].innerHTML = `Subtotal: $${producto.subtotal()}`;
        actualizarPrecio();
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
    }

    //Llamada a la funcion para restar cantidad de productos del carrito
    $('.btn-sub').on('click', restarCarrito);

    //Funcion para restar cantidad de productos al carrito
    function restarCarrito(event) {
        event.stopPropagation();
        let producto = carrito.find(producto => producto.id == event.target.id);
        if (producto.cantidad > 1) {
            producto.agregarCantidad(-1);
            $(this).parent().children()[1].innerHTML = producto.cantidad;
            $(this).parent().children()[4].innerHTML = `Subtotal: $${producto.subtotal()}`;
            actualizarPrecio();
            localStorage.setItem('carrito', JSON.stringify(carrito)); 
        }
    }  
    //Tomo el botón "Confirmar", agrego evento de escucha clic y llamada a la función enviarCompra
    $('#btnConfirmar').on("click", enviarCompra);
}

//Función para actualizar el precio final de la compra al agregar, restar o eliminar productos del carrito
precioFinal.innerText = "0";

function actualizarPrecio() {
    let precioFinal = document.getElementById('precioFinal');
    precioFinal.innerText = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
}

//Funcion para enviar los datos a la API despues de confirmada la compra, vaciar el carrito y que la cantidad vuelva a 0
function enviarCompra() {
    $.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(carrito), function (respuesta, estado) {
        //Pregunto si el estado de la operacion fue exitoso
        if (estado == "success") {
            //Vacio el carrito
            $('#carritoProductos').empty();
            localStorage.clear();
            //Vacio la cantidad de productos
            $('#cantidadCarrito').html("0");
            localStorage.clear();
        }
        else {
            console.log('Los datos no se enviaron correctamente');
        }
    })
}

//Fnción para crear la interfaz dinámica para seleccionar las categorias
function selectUI(lista, selector) {  
    $(selector).empty();
    for (const categoria of lista) {
        $(selector).append(`<option>${categoria}</option>`);
    }
    $(selector).prepend(`<option selected>TODOS</option>`); 
}

//Función para filtrar por categorias y mostrar todos los productos en caso de seleccionar la opción TODOS
function buscarCategoria() { 
    let valor = this.value; 
    $("#productosContenedor").fadeOut(1500, function() {  
        if (valor != "TODOS") {
            let filtrados = productos.filter(producto => producto.categoria == valor);
            productosUI(filtrados, "#productosContenedor");
        }
        else {
            productosUI(productos, "#productosContenedor");
        }
    }).fadeIn(1500);
}

//Función para validar formulario de contacto antes de enviarlo al servidor, evitar perder la información y poder procesarla con JS
let formularioContacto = document.getElementById('formulario');
function validarFormulario(e) {
    e.preventDefault();
}

formularioContacto.addEventListener('submit', validarFormulario);




//Clase constructora con todos los objetos de los productos

class productos {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.comprarProducto = function (valor) {
            return 'Nombre: ' + this.name + ' \n Precio: $' + this.price;
        };
    }
}

const comidas = [
    { id: 1, name: 'Hamburguesa de carne', price: 300, img: 'hamburguesa', quantity: 'Caja 4 unidades' } ,
    { id: 2, name: 'Papas fritas clásicas', price: 450, price: 450, img: 'papas', quantity: 'Bolsa 500g'},
    { id: 3, name: 'Helado de vainilla', price: 500, img: 'helado', quantity: 'Pote 1/2Kg' },
    { id: 4, name: 'Empanadas de carne', price: 350, img: 'facturas', quantity: 'Docena' },
];

const carrito = [];

//Tomo el elemento con ID "shoppingProducts" y luego con el bucle for pueblo el HTML "shop" con las cards que cree.
const contenedorProductos = document.getElementById("shoppingProducts");

for (const producto of comidas) {
    let divProducto = document.createElement('div');
    divProducto.innerHTML = `<div class="card producto cursor" style="width: 18rem;" data-aos="zoom-in-down">
                                <img src="../assets/images/${producto.img}.jpg" class="card-img-top" alt="Hamburguesas">
                                <div class="card-body text-center d-flex justify-content-center cuerpoShop">
                                    <p class="card-text textoShop">${producto.name}</p>
                                    <p class="card-text textoShop">${producto.quantity}</p>
                                    <p class="card-text textoShop">Precio: $${producto.price}</p>
                                    <a href="#" id='${producto.id}' class="btn btn-primary btnBUY">Comprar</a>
                                </div>
                            </div>`;
    contenedorProductos.appendChild(divProducto);
}

//Funcion para agregar los productos al carrito cuando hago clic en "Comprar"
let botonBuy= jQuery(".btnBUY");

for (const boton of botonBuy) {
    boton.onclick = comprarProducto;
}

//Funcion para hacer el local storage del array de productos y pasarlo a JSON
function comprarProducto(event) {
    event.preventDefault();

    let encontrado = comidas.find(producto => producto.id == event.target.id);
    localStorage.setItem('idProducto', JSON.stringify(encontrado));

    carrito.push(encontrado);
    carritoComida(carrito);
}

//Funcion para ver los productos elegidos en el carrito de compras
function carritoComida(carrito) {
    jQuery("#carritoCantidad").html(carrito.length);
    jQuery("#carritoProducto").empty();

    for (const producto of carrito) {
        jQuery("#carritoProducto").append(`<p> ${producto.name}&nbsp;&nbsp;&nbsp;Cantidad: ${producto.quantity}&nbsp;&nbsp;&nbsp;Precio: $${producto.price}</p>
                                        `);
    }
}

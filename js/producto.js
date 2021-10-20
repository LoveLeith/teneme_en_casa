//Declaracion de la clase de producto mas metodos para agregar la cantidad de productos y calcular el subtotal de la compra

class Producto {
    constructor(id, nombre, precio, img, categoria) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.img = img;
        this.cantidad = 1;
        this.categoria = categoria;
    }
    agregarCantidad(valor) {
        this.cantidad += valor;
    }
    subtotal() {
        return this.cantidad * this.precio;
    }

}
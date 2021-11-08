//Declaracion clase constructora de producto y métodos para agregar cantidad de productos y cálculo del subtotal

class Producto {
    constructor(id, nombre, precio, img, categoria, cantidad) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.img = img;
        this.cantidad = cantidad || 1;
        this.categoria = categoria;
    }
    agregarCantidad(valor) {
        this.cantidad += valor;
    }
    subtotal() {
        return this.cantidad * this.precio;
    }
    
}
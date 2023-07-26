const productos = [
    {
        id: 1,
        nombre: "Artisan Zero",
        precio: 49,
        img: "../img/artizerodef.jpg"
        
    },
    {
        id: 2,
        nombre: "Esport Tiger Eba",
        precio: 39,
        img: "../img/ebadef.jpg"
    },
    {
        id: 3,
        nombre: "Cooler Master MP511",
        precio: 20,
        img: "../img/mp511def.jpg"
    },
    {
        id: 4,
        nombre: "Esport Tiger Mor",
        precio: 30,
        img: "../img/tigermordef.jpg"
    },
    {
        id: 5,
        nombre: "Vancer Ice",
        precio: 45,
        img: "../img/vancericedef.webp"
    },
    {
        id: 6,
        nombre: "Vaxee PA Summer Edition",
        precio: 29,
        img: "../img/vaxeepa2.jpg"
    },
    {
        id: 7,
        nombre: "Lethal Gaming Venus",
        precio: 33,
        img: "../img/venusdef.jpg"
    },
    {
        id: 8,
        nombre: "Esport Tiger Wuxiang",
        precio: 40,
        img: "../img/wuxiangdef.jpg"
    },
]

const carritoProductos = document.querySelector("#productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const cantidad = document.querySelector("#cantidad-productos");

cargarProductos(productos);

/***** FUNCIONES *****/
function cargarProductos(productos) {

    carritoProductos.innerHTML = "";

    productos.forEach( producto => {

        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML += `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="descripcion">
            <p><b>${producto.nombre}</b></p>
            <p>US$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">AGREGAR</button>
            </div>`;

        carritoProductos.append(item);

    });

    actualizarBotonesAgregar();

}

let productosEnCarrito;
const productosEnCarritoLS = localStorage.getItem("productos-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarCantidad();
} else{
    productosEnCarrito = [];
}

function agregarProductoCarrito(e){
        
    const idBoton = e.currentTarget.id;
    const productoAgregar = productos.find(producto => producto.id == idBoton);

    if (productosEnCarrito.some(producto => producto.id == idBoton)){
        const indexProducto = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[indexProducto].cantidad += 1;
    } else{
        productoAgregar.cantidad = 1;
        productosEnCarrito.push(productoAgregar);
    }

    actualizarCantidad();

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCantidad(){
    let num = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad , 0);
    cantidad.innerText = num;
}

function actualizarBotonesAgregar(){

    botonesAgregar = document.querySelectorAll(".producto-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarProductoCarrito);
    });

}
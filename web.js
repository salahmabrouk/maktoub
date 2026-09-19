/* =========================
   CONFIGURACIÓN
========================= */

// CAMBIA ESTOS DATOS POR LOS TUYOS

const WHATSAPP = "34643530983";

const EMAIL = "maktoubone1@gmail.com";

const PRODUCT_NAME = "Tu producto";

const PRODUCT_PRICE = 25.99;


/* =========================
   VARIABLES
========================= */

let selectedColor = "Negro";

let selectedImage = "media/producto2.PNG";

let selectedSize = "M";

let quantity = 1;

let cart = [];


/* =========================
   COLOR
========================= */

function seleccionarColor(color, image, button) {

    selectedColor = color;

    selectedImage = image;

    document.getElementById("productImage").src = image;

    document.getElementById("selectedColor").textContent = color;

    document.querySelectorAll(".color").forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");
}


/* =========================
   TALLA
========================= */

function seleccionarTalla(size, button) {

    selectedSize = size;

    document.querySelectorAll(".sizes button").forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");
}


/* =========================
   CANTIDAD
========================= */

function cambiarCantidad(number) {

    quantity += number;

    if (quantity < 1) {

        quantity = 1;

    }

    if (quantity > 20) {

        quantity = 20;

    }

    document.getElementById("quantity").textContent = quantity;
}


/* =========================
   AÑADIR AL CARRITO
========================= */

function agregarAlCarrito() {

    const product = {

        name: PRODUCT_NAME,

        price: PRODUCT_PRICE,

        color: selectedColor,

        size: selectedSize,

        image: selectedImage,

        quantity: quantity

    };

    cart.push(product);

    actualizarCarrito();

    abrirCarrito();

}


/* =========================
   ACTUALIZAR CARRITO
========================= */

function actualizarCarrito() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cartTotal");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío.
            </p>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "0,00 €";

        return;
    }


    let html = "";

    let total = 0;

    let count = 0;


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        count += item.quantity;


        html += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Color: ${item.color}
                    </p>

                    <p>
                        Talla: ${item.size}
                    </p>

                    <p>
                        Cantidad: ${item.quantity}
                    </p>

                    <p>
                        ${itemTotal.toFixed(2).replace(".", ",")} €
                    </p>

                </div>

                <button
                    class="remove"
                    onclick="eliminarProducto(${index})">

                    ✕

                </button>

            </div>
        `;
    });


    cartItems.innerHTML = html;

    cartCount.textContent = count;

    cartTotal.textContent =
        total.toFixed(2).replace(".", ",") + " €";
}


/* =========================
   ELIMINAR PRODUCTO
========================= */

function eliminarProducto(index) {

    cart.splice(index, 1);

    actualizarCarrito();
}


/* =========================
   ABRIR CARRITO
========================= */

function abrirCarrito() {

    document.getElementById("cart").classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("show");
}


/* =========================
   CERRAR CARRITO
========================= */

function cerrarCarrito() {

    document.getElementById("cart").classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");
}


/* =========================
   PEDIDO WHATSAPP
========================= */

function pedidoWhatsApp() {

    if (cart.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }


    let message = "🔥 PEDIDO MAKTOUB 🔥%0A%0A";

    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        message +=
            `${index + 1}. ${item.name}%0A` +
            `Color: ${item.color}%0A` +
            `Talla: ${item.size}%0A` +
            `Cantidad: ${item.quantity}%0A` +
            `Precio: ${itemTotal.toFixed(2)} €%0A%0A`;

    });


    message +=
        `TOTAL: ${total.toFixed(2)} €%0A%0A` +
        `Hola MAKTOUB, quiero realizar este pedido.`;


    const url =
        `https://wa.me/${WHATSAPP}?text=${message}`;


    window.open(url, "_blank");
}


/* =========================
   PEDIDO EMAIL
========================= */

function pedidoEmail() {

    if (cart.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }


    let subject = "Pedido MAKTOUB";

    let body = "Hola MAKTOUB,%0A%0A";

    body += "Quiero realizar el siguiente pedido:%0A%0A";


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        body +=
            `${index + 1}. ${item.name}%0A` +
            `Color: ${item.color}%0A` +
            `Talla: ${item.size}%0A` +
            `Cantidad: ${item.quantity}%0A` +
            `Precio: ${itemTotal.toFixed(2)} €%0A%0A`;

    });


    body +=
        `TOTAL: ${total.toFixed(2)} €%0A%0A` +
        `Nombre:%0A` +
        `Teléfono:%0A` +
        `Dirección:%0A%0A` +
        `Gracias.`;


    const url =
        `mailto:${EMAIL}?subject=${subject}&body=${body}`;


    window.location.href = url;
}


/* =========================
   MÚSICA
========================= */

const music = document.getElementById("music");

function toggleMusic() {

    const button =
        document.getElementById("musicButton");


    if (music.paused) {

        music.play();

        button.textContent = "🔊 MÚSICA";

    } else {

        music.pause();

        button.textContent = "🔇 MÚSICA";

    }
}


/* =========================
   INICIO
========================= */

actualizarCarrito();

// PRODUCTOS
const WHATSAPP = "34643530983";
const EMAIL = "maktoubone1@gmail.com";

let selectedColor = "Negro";
let selectedImage = "media/cnegra.jpeg";
let selectedSize = "M";
let quantity = 1;

let selectedColorSudadera = "Negro";
let selectedImageSudadera = "media/sudadera.PNG";
let selectedSizeSudadera = "M";
let quantitySudadera = 1;

let cart = [];

// CAMISETA: COLOR Y TALLA
function seleccionarColor(color, image, button) {
    selectedColor = color;
    selectedImage = image;

    document.getElementById("productImage").src = image;
    document.getElementById("selectedColor").textContent = color;

    button.parentElement.querySelectorAll(".color")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
}

function seleccionarTalla(size, button) {
    selectedSize = size;

    button.parentElement.querySelectorAll("button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
}

// SUDADERA: COLOR Y TALLA
function seleccionarColorSudadera(color, image, button) {
    selectedColorSudadera = color;
    selectedImageSudadera = image;

    document.getElementById("sudaderaImage").src = image;
    document.getElementById("selectedColorSudadera").textContent = color;

    button.parentElement.querySelectorAll(".color")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
}

function seleccionarTallaSudadera(size, button) {
    selectedSizeSudadera = size;

    button.parentElement.querySelectorAll("button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
}

// CANTIDADES INDEPENDIENTES
function cambiarCantidad(number) {
    quantity = Math.max(1, Math.min(20, quantity + number));
    document.getElementById("quantity").textContent = quantity;
}

function cambiarCantidadSudadera(number) {
    quantitySudadera = Math.max(1, Math.min(20, quantitySudadera + number));
    document.getElementById("quantitySudadera").textContent = quantitySudadera;
}

// AÑADIR CUALQUIERA DE LOS DOS PRODUCTOS
function agregarAlCarrito(tipo) {
    let product;

    if (tipo === "sudadera") {
        product = {
            name: "Sudadera Maktoub",
            price: 29.99,
            color: selectedColorSudadera,
            size: selectedSizeSudadera,
            image: selectedImageSudadera,
            quantity: quantitySudadera
        };
    } else {
        product = {
            name: "Camiseta Maktoub",
            price: 25.99,
            color: selectedColor,
            size: selectedSize,
            image: selectedImage,
            quantity: quantity
        };
    }

    cart.push(product);
    actualizarCarrito();
    abrirCarrito();
}

// CARRITO
function actualizarCarrito() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cartTotal");

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
        cartCount.textContent = "0";
        cartTotal.textContent = "0,00 €";
        return;
    }

    let total = 0;
    let count = 0;

    cartItems.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Color: ${item.color}</p>
                    <p>Talla: ${item.size}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>${itemTotal.toFixed(2).replace(".", ",")} €</p>
                </div>
                <button class="remove" onclick="eliminarProducto(${index})">✕</button>
            </div>
        `;
    }).join("");

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2).replace(".", ",") + " €";
}

function eliminarProducto(index) {
    cart.splice(index, 1);
    actualizarCarrito();
}

function abrirCarrito() {
    document.getElementById("cart").classList.add("open");
    document.getElementById("cartOverlay").classList.add("show");
}

function cerrarCarrito() {
    document.getElementById("cart").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("show");
}

// PEDIDO POR WHATSAPP
function pedidoWhatsApp() {
    if (!cart.length) {
        alert("Tu carrito está vacío.");
        return;
    }

    let total = 0;
    let message = "🔥 PEDIDO MAKTOUB 🔥\n\n";

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        message += `${index + 1}. ${item.name}\n`;
        message += `Color: ${item.color}\n`;
        message += `Talla: ${item.size}\n`;
        message += `Cantidad: ${item.quantity}\n`;
        message += `Precio: ${subtotal.toFixed(2)} €\n\n`;
    });

    message += `TOTAL: ${total.toFixed(2)} €\n\n`;
    message += "Hola MAKTOUB, quiero realizar este pedido.";

    window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}

// PEDIDO POR EMAIL
function pedidoEmail() {
    if (!cart.length) {
        alert("Tu carrito está vacío.");
        return;
    }

    let total = 0;
    let body = "Hola MAKTOUB,\n\nQuiero realizar el siguiente pedido:\n\n";

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        body += `${index + 1}. ${item.name}\n`;
        body += `Color: ${item.color}\n`;
        body += `Talla: ${item.size}\n`;
        body += `Cantidad: ${item.quantity}\n`;
        body += `Precio: ${subtotal.toFixed(2)} €\n\n`;
    });

    body += `TOTAL: ${total.toFixed(2)} €\n\n`;
    body += "Nombre:\nTeléfono:\nDirección:\n\nGracias.";

    window.location.href =
        `mailto:${EMAIL}?subject=${encodeURIComponent("Pedido MAKTOUB")}&body=${encodeURIComponent(body)}`;
}



actualizarCarrito();

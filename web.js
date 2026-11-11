// CONFIGURA AQUÍ TUS DATOS ANTES DE PUBLICAR
const WHATSAPP_NUMBER = "34643530983"; // Ejemplo: 34600111222, sin + ni espacios
const STORE_EMAIL = "maktoubone1@gmail.com";

const products = {
  camiseta: {
    name:"Camiseta MAKTOUB", price:15, oldPrice:20,
    description:"Camiseta MAKTOUB de estilo streetwear. Una prenda esencial para llevar tu identidad y tu camino.",
    colors:{
      "Negro":["media/cnegra1.JPG","media/cnegra.jpeg"],
      "Blanco":["media/cblanca1.JPG","media/cblanca.jpeg"]
    }, sizes:["S","M","L","XL","XXL"]
  },
  sudadera: {
    name:"Sudadera MAKTOUB", price:27, oldPrice:30,
    description:"Sudadera MAKTOUB cómoda y urbana, pensada para acompañarte en tu día a día.",
    colors:{
      "Negro":["media/snegra1.JPG","media/snegra.JPG"],
      "Gris":["media/sgris1.JPG","media/sgris.JPG"]
    }, sizes:["S","M","L","XL","XXL"],
  },
  chandal: {
    name:"Chándal MAKTOUB", price:40, oldPrice:45,
    description:"Chándal MAKTOUB de estilo streetwear. Elige tu color y tu talla.",
    colors:{
      "Negro":["media/chandal1.JPG","media/chandal_negro.JPG"],
      "Gris":["media/chandal1.JPG","media/chandal_gris.JPG"]
    }, sizes:["S","M","L","XL","XXL"],
  }
};

let selectedProduct = null;
let selectedColor = "";
let selectedSize = "M";
let selectedQuantity = 1;
let cartItems = JSON.parse(localStorage.getItem("maktoubCart") || "[]");

const $ = id => document.getElementById(id);
const money = n => `${n.toFixed(2).replace(".",",")} $`;

function abrirProducto(id){
  selectedProduct = products[id];
  selectedProduct.id = id;
  selectedColor = Object.keys(selectedProduct.colors)[0];
  selectedSize = "M";
  selectedQuantity = 1;
  $("modalTitle").textContent = selectedProduct.name;
  $("modalPrice").innerHTML = selectedProduct.oldPrice
    ? `<del>${money(selectedProduct.oldPrice)}</del> <strong>${money(selectedProduct.price)}</strong>`
    : money(selectedProduct.price);
  $("modalDescription").textContent = selectedProduct.description;
  $("modalQuantity").textContent = selectedQuantity;
  renderProductChoices();
  renderGallery();
  $("productModal").classList.add("open");
  $("productModal").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function cerrarProducto(){
  $("productModal").classList.remove("open");
  $("productModal").setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
function cerrarProductoDesdeFondo(event){
  if(event.target === $("productModal")) cerrarProducto();
}



function renderProductChoices(){
  $("modalColors").innerHTML = Object.keys(selectedProduct.colors).map(color =>
    `<button class="choice ${color===selectedColor?"active":""}" onclick="seleccionarColor('${color}')">${color}</button>`
  ).join("");
  $("modalSizes").innerHTML = selectedProduct.sizes.map(size =>
    `<button class="choice ${size===selectedSize?"active":""}" onclick="seleccionarTalla('${size}')">${size}</button>`
  ).join("");
}


function renderGallery(){
  const photos = selectedProduct.colors[selectedColor];
  $("modalMainImage").src = photos[0];
  $("modalMainImage").alt = `${selectedProduct.name} ${selectedColor}`;
  $("modalThumbnails").innerHTML = photos.map((src,index) =>
    `<button class="thumbnail ${index===0?"active":""}" onclick="cambiarFoto('${src}',this)"><img src="${src}" alt="Vista ${index+1}" onerror="this.parentElement.style.display='none'"></button>`
  ).join("");
}
function cambiarFoto(src,button){
  $("modalMainImage").src=src;
  document.querySelectorAll(".thumbnail").forEach(el=>el.classList.remove("active"));
  button.classList.add("active");
}
function seleccionarColor(color){selectedColor=color;renderProductChoices();renderGallery();}
function seleccionarTalla(size){selectedSize=size;renderProductChoices();}
function cambiarCantidad(change){
  selectedQuantity=Math.max(1,Math.min(20,selectedQuantity+change));
  $("modalQuantity").textContent=selectedQuantity;
}
function agregarAlCarrito(){
  const key=`${selectedProduct.id}|${selectedColor}|${selectedSize}`;
  const existing=cartItems.find(item=>item.key===key);
  if(existing) existing.quantity+=selectedQuantity;
  else cartItems.push({key,id:selectedProduct.id,name:selectedProduct.name,color:selectedColor,size:selectedSize,quantity:selectedQuantity,price:selectedProduct.price});
  saveCart();
  cerrarProducto();
  abrirCarrito();
}
function saveCart(){localStorage.setItem("maktoubCart",JSON.stringify(cartItems));renderCart();}
function renderCart(){
  const count=cartItems.reduce((sum,item)=>sum+item.quantity,0);
  $("cart-count").textContent=count;
  $("cartItems").innerHTML=cartItems.length?cartItems.map(item=>`
    <div class="cart-row"><div><h4>${item.name}</h4><p>${item.color} · Talla ${item.size}</p><p>${money(item.price)} unidad</p></div>
    <div><strong>${money(item.price*item.quantity)}</strong><p>
    <button onclick="cambiarCantidadCarrito('${item.key}',-1)">−</button>${item.quantity}
    <button onclick="cambiarCantidadCarrito('${item.key}',1)">+</button>
    <button onclick="eliminarDelCarrito('${item.key}')">✕</button></p></div></div>`).join("")
    :'<p class="empty-cart">Tu cesta está vacía.</p>';
  const total=cartItems.reduce((sum,item)=>sum+item.price*item.quantity,0);
  $("cartTotal").textContent=money(total);
}
function cambiarCantidadCarrito(key,change){
  const item=cartItems.find(i=>i.key===key);if(!item)return;
  item.quantity+=change;if(item.quantity<=0)eliminarDelCarrito(key);else saveCart();
}
function eliminarDelCarrito(key){cartItems=cartItems.filter(i=>i.key!==key);saveCart();}
function abrirCarrito(){$("cart").classList.add("open");$("cartOverlay").classList.add("open");}
function cerrarCarrito(){$("cart").classList.remove("open");$("cartOverlay").classList.remove("open");}
function crearMensajePedido(){
  if(!cartItems.length){alert("Tu cesta está vacía.");return null;}
  const name=$("customerName").value.trim();
  if(!name){alert("Escribe tu nombre para continuar.");$("customerName").focus();return null;}
  const total=cartItems.reduce((sum,item)=>sum+item.price*item.quantity,0);
  const lines=cartItems.map(item=>`• ${item.name} | ${item.color} | Talla ${item.size} | Cantidad: ${item.quantity} | ${money(item.price*item.quantity)}`);
  const notes=$("customerNotes").value.trim();
  return `Hola MAKTOUB, quiero realizar este pedido.\nNombre: ${name}\n\n${lines.join("\n")}\n\nTOTAL: ${money(total)}${notes?`\nNotas: ${notes}`:""}`;
}
function pedidoWhatsApp(){
  const message=crearMensajePedido();if(!message)return;
  if(WHATSAPP_NUMBER.includes("X")){alert("Añade tu número de WhatsApp en web.js antes de usar esta opción.");return;}
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank");
}
function pedidoEmail(){
  const message=crearMensajePedido();if(!message)return;
  window.location.href=`mailto:${STORE_EMAIL}?subject=${encodeURIComponent("Nuevo pedido MAKTOUB")}&body=${encodeURIComponent(message)}`;
}
$("musicToggle").addEventListener("click",async()=>{
  const audio=$("music");
  try{if(audio.paused){await audio.play();$("musicToggle").textContent="♫ DESACTIVAR MÚSICA";}else{audio.pause();$("musicToggle").textContent="♫ ACTIVAR MÚSICA";}}
  catch(error){alert("Añade tu archivo media/musica_web.mp3 para activar la música.");}
});
document.addEventListener("keydown",event=>{if(event.key==="Escape"){cerrarProducto();cerrarCarrito();}});
renderCart();

// ==========================================
// INNOVA 3D - FUNCIONES DE LA PÁGINA
// ==========================================


// ==========================================
// DATOS DE CONTACTO DE LA EMPRESA
// ==========================================

// Reemplazá estos datos por los verdaderos.

const telefono = "5491100000000";
const telefonoVisible = "+54 9 11 0000-0000";
const correoEmpresa = "contacto@innova3d.com";


// Actualizar teléfono y correo en la página.

document.getElementById("phoneText").textContent = telefonoVisible;
document.getElementById("emailText").textContent = correoEmpresa;

document.getElementById("whatsappLink").href =
    "https://wa.me/" + telefono;

document.getElementById("footerWhatsapp").href =
    "https://wa.me/" + telefono;

document.getElementById("footerWhatsapp").textContent =
    telefonoVisible;

document.getElementById("emailLink").href =
    "mailto:" + correoEmpresa;

document.getElementById("footerEmail").href =
    "mailto:" + correoEmpresa;

document.getElementById("footerEmail").textContent =
    correoEmpresa;


// ==========================================
// MENÚ PARA CELULARES
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {

    nav.classList.toggle("open");

    const abierto = nav.classList.contains("open");

    menuToggle.textContent = abierto ? "×" : "☰";
    menuToggle.setAttribute("aria-expanded", abierto);

    menuToggle.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );

});


// Cerrar el menú al tocar un enlace.

nav.querySelectorAll("a").forEach(function (enlace) {

    enlace.addEventListener("click", function () {
        nav.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    });

});


// ==========================================
// FILTRAR Y BUSCAR PRODUCTOS
// ==========================================

const filtros = document.querySelectorAll(".filter");
const tarjetas = document.querySelectorAll(".product-card");
const buscador = document.getElementById("buscarProducto");

let categoriaActual = "todos";


// Crear un mensaje para cuando no haya resultados.

const mensajeVacio = document.createElement("div");

mensajeVacio.className = "no-results";
mensajeVacio.textContent =
    "No encontramos productos con esos criterios. Probá otra búsqueda.";

mensajeVacio.hidden = true;

document.querySelector(".products-grid").appendChild(mensajeVacio);


// Función para actualizar el catálogo.

function actualizarCatalogo() {

    const texto = buscador.value.toLowerCase().trim();
    let cantidadVisible = 0;

    tarjetas.forEach(function (producto) {

        const categoria = producto.dataset.categoria;
        const nombre = producto.dataset.nombre;

        const coincideCategoria =
            categoriaActual === "todos" ||
            categoria === categoriaActual;

        const coincideBusqueda =
            nombre.includes(texto) ||
            categoria.includes(texto);

        if (coincideCategoria && coincideBusqueda) {

            producto.classList.remove("hidden");
            cantidadVisible++;

        } else {

            producto.classList.add("hidden");

        }

    });

    mensajeVacio.hidden = cantidadVisible !== 0;

}


// Activar filtros.

filtros.forEach(function (filtro) {

    filtro.addEventListener("click", function () {

        filtros.forEach(function (boton) {
            boton.classList.remove("active");
        });

        filtro.classList.add("active");

        categoriaActual = filtro.dataset.filtro;

        actualizarCatalogo();

    });

});


// Buscar mientras se escribe.

buscador.addEventListener("input", actualizarCatalogo);


// ==========================================
// ENLACES DE CATEGORÍAS
// ==========================================

// Las tarjetas de categorías llevan al catálogo
// y seleccionan el filtro correspondiente.

document.querySelectorAll("[data-ir-categoria]").forEach(
    function (enlace) {

        enlace.addEventListener("click", function () {

            const categoria = enlace.dataset.irCategoria;

            seleccionarCategoria(categoria);

        });

    }
);


// También funcionan las categorías del pie de página.

document.querySelectorAll("[data-pie-categoria]").forEach(
    function (enlace) {

        enlace.addEventListener("click", function () {

            const categoria = enlace.dataset.pieCategoria;

            seleccionarCategoria(categoria);

        });

    }
);


// Seleccionar una categoría desde cualquier sección.

function seleccionarCategoria(categoria) {

    categoriaActual = categoria;
    buscador.value = "";

    filtros.forEach(function (filtro) {

        if (filtro.dataset.filtro === categoria) {
            filtro.classList.add("active");
        } else {
            filtro.classList.remove("active");
        }

    });

    actualizarCatalogo();

}


// ==========================================
// MENSAJE EMERGENTE
// ==========================================

const toast = document.getElementById("toast");

let temporizadorToast;

function mostrarMensaje(texto) {

    toast.textContent = texto;
    toast.classList.add("show");

    clearTimeout(temporizadorToast);

    temporizadorToast = setTimeout(function () {
        toast.classList.remove("show");
    }, 2800);

}


// ==========================================
// BOTONES PARA CONSULTAR PRODUCTOS
// ==========================================

const botonesProducto = document.querySelectorAll(".product-add");
const campoMensaje = document.getElementById("mensaje");

let productosElegidos = [];

botonesProducto.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const producto = boton.dataset.producto;

        // Agregar el producto sin duplicarlo.

        if (!productosElegidos.includes(producto)) {
            productosElegidos.push(producto);
        }

        // Mostrar los productos seleccionados
        // dentro del mensaje del formulario.

        const textoProductos =
            "Productos de interés: " + productosElegidos.join(", ");

        const mensajeActual = campoMensaje.value;

        if (mensajeActual.includes("Productos de interés:")) {

            campoMensaje.value = mensajeActual.replace(
                /Productos de interés:.*/,
                textoProductos
            );

        } else {

            if (mensajeActual.trim() !== "") {
                campoMensaje.value =
                    mensajeActual + "\n\n" + textoProductos;
            } else {
                campoMensaje.value = textoProductos;
            }

        }

        mostrarMensaje("Producto agregado a tu consulta.");

        // Llevar al formulario.

        document.getElementById("contacto").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================

const formulario = document.getElementById("contactForm");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const tipo = document.getElementById("tipo").value;
    const mensaje = campoMensaje.value.trim();

    if (!nombre || !email || !mensaje) {

        mostrarMensaje("Completá todos los campos obligatorios.");
        return;

    }

    // Preparar el asunto.

    const asunto = encodeURIComponent(
        "Consulta INNOVA 3D - " + tipo
    );

    // Preparar el cuerpo del correo.

    const cuerpo = encodeURIComponent(
        "Hola, INNOVA 3D.\n\n" +
        "Mi nombre es: " + nombre + "\n" +
        "Mi correo: " + email + "\n" +
        "Tipo de proyecto: " + tipo + "\n\n" +
        "Detalles de mi consulta:\n" + mensaje + "\n\n" +
        "Espero su respuesta. ¡Muchas gracias!"
    );

    // Abrir el correo para que el cliente pueda enviarlo.

    window.location.href =
        "mailto:" + correoEmpresa +
        "?subject=" + asunto +
        "&body=" + cuerpo;

});


// ==========================================
// AÑO AUTOMÁTICO DEL COPYRIGHT
// ==========================================

document.getElementById("year").textContent =
    new Date().getFullYear();
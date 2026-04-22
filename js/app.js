async function cargarCSV() {
    const response = await fetch("productos.csv");
    const data = await response.text();

    const filas = data.split("\n").slice(1);

    const productos = filas.map(fila => {
        const [nombre, descripcion, precio, categoria] = fila.split(",");

        return {
            nombre,
            descripcion,
            precio,
            categoria
        };
    });

    mostrarProductos(productos);
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    const pagina = window.location.pathname;

    productos.forEach(prod => {

        if (pagina.includes("lamparas") && prod.categoria !== "lamparas") return;
        if (pagina.includes("bulbos") && prod.categoria !== "bulbos") return;

        const card = `
            <div class="card">
                <img src="img/productos/default.jpg">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <div class="precio">${prod.precio}</div>
                <a class="btn" href="https://wa.me/5491133088234?text=${prod.nombre}">Consultar</a>
            </div>
        `;

        contenedor.innerHTML += card;
    });
}

window.onload = cargarCSV;
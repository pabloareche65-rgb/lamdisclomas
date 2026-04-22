async function cargarCSV() {
    const response = await fetch("productos.csv");
    const data = await response.text();

    const filas = data.trim().split(/\r?\n/).slice(1);

    const productos = filas.map(fila => {

        // Detecta si es ; o ,
        const columnas = fila.includes(";") ? fila.split(";") : fila.split(",");

        return {
            nombre: columnas[0] ? columnas[0].trim() : "",
            descripcion: columnas[1] ? columnas[1].trim() : "",
            precio: columnas[2] ? columnas[2].trim() : "",
            categoria: columnas[3] ? columnas[3].trim().toLowerCase() : ""
        };
    });

    mostrarProductos(productos);
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    const pagina = window.location.pathname.toLowerCase();

    productos.forEach(prod => {

        // FILTROS POR PAGINA
        if (pagina.includes("lamparas") && prod.categoria !== "lamparas") return;
        if (pagina.includes("bulbos") && prod.categoria !== "bulbos") return;

        // EN INDEX SOLO 3 PRODUCTOS
        if (!pagina.includes("lamparas") && !pagina.includes("bulbos")) {
            if (contenedor.children.length >= 3) return;
        }

        const card = `
            <div class="card">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <div class="precio">${prod.precio}</div>
                <a class="btn" href="https://wa.me/5491133088234?text=${encodeURIComponent(prod.nombre)}">Consultar</a>
            </div>
        `;

        contenedor.innerHTML += card;
    });
}

window.onload = cargarCSV;
async function cargarCSV() {
    const response = await fetch("productos.csv");
    const data = await response.text();

    const filas = data.trim().split(/\r?\n/).slice(1);

    const productos = filas.map(fila => {
        const columnas = fila.includes(";") ? fila.split(";") : fila.split(",");

        return {
            nombre: columnas[0]?.trim(),
            descripcion: columnas[1]?.trim(),
            precio: columnas[2]?.trim(),
            categoria: columnas[3]?.trim().toLowerCase()
        };
    });

    mostrarProductos(productos);
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    const pagina = window.location.pathname.toLowerCase();

    let categoriaPagina = "";

    if (pagina.includes("lamparas")) {
        categoriaPagina = "lamparas";
    } else if (pagina.includes("bulbos")) {
        categoriaPagina = "bulbos";
    }

    productos.forEach(prod => {

        // FILTRAR SOLO SI NO ES INDEX
        if (categoriaPagina && prod.categoria !== categoriaPagina) return;

        // EN INDEX SOLO 3 PRODUCTOS
        if (!categoriaPagina && contenedor.children.length >= 3) return;

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
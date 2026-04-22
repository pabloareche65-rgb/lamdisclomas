let listaProductos = [];

async function cargarCSV() {
    const response = await fetch("productos.csv");
    const data = await response.text();

    const filas = data.trim().split(/\r?\n/).slice(1);

    listaProductos = filas.map(fila => {
        const columnas = fila.includes(";") ? fila.split(";") : fila.split(",");

        return {
            nombre: columnas[0]?.trim().toLowerCase(),
            descripcion: columnas[1]?.trim().toLowerCase(),
            precio: columnas[2]?.trim(),
            categoria: columnas[3]?.trim().toLowerCase()
        };
    });

    mostrarProductos(listaProductos);
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    const pagina = window.location.pathname.toLowerCase();

    let categoriaPagina = "";

    if (pagina.includes("lampara")) categoriaPagina = "lamparas";
    if (pagina.includes("bulbo")) categoriaPagina = "bulbos";

    let contador = 0;

    productos.forEach(prod => {

        // FILTRO POR PAGINA
        if (categoriaPagina && prod.categoria !== categoriaPagina) return;

        // SOLO 3 EN HOME
        if (!categoriaPagina && contador >= 3) return;

        const card = `
            <div class="card">
                <h3>${prod.nombre.toUpperCase()}</h3>
                <p>${prod.descripcion}</p>
                <div class="precio">${prod.precio}</div>
                <a class="btn" href="https://wa.me/5491133088234?text=${encodeURIComponent(prod.nombre)}">Consultar</a>
            </div>
        `;

        contenedor.innerHTML += card;
        contador++;
    });
}

// 🔥 BUSCADOR EN VIVO (ACA ESTÁ LA CLAVE)
document.addEventListener("input", function(e) {

    if (e.target.id === "buscar") {

        const texto = e.target.value.toLowerCase();

        const filtrados = listaProductos.filter(prod => {
            return (
                prod.nombre.includes(texto) ||
                prod.descripcion.includes(texto)
            );
        });

        mostrarProductos(filtrados);
    }
});

window.onload = cargarCSV;
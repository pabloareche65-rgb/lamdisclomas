function cargarProductos(filtro = null) {
    const contenedor = document.getElementById("contenedor-productos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(prod => {

        if (filtro && prod.categoria !== filtro) return;

        const card = `
            <div class="card">
                <img src="${prod.imagen}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <div class="precio">${prod.precio}</div>
                <a class="btn" href="https://wa.me/5491133088234?text=${prod.nombre}">Consultar</a>
            </div>
        `;

        contenedor.innerHTML += card;
    });
}

window.onload = () => {

    const pagina = window.location.pathname;

    if (pagina.includes("lamparas")) {
        cargarProductos("lamparas");
    }
    else if (pagina.includes("bulbos")) {
        cargarProductos("bulbos");
    }
    else {
        // INDEX → SOLO LAMPARAS
        cargarProductos("lamparas");
    }
};16:22 21/4/2026
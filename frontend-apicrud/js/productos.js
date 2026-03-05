//variables globales

let tablepro = document.querySelector("#tablepro");
let searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", ()=>{
    console.log("Buscando producto: " + searchInput.value);
});



document.addEventListener("DOMContentLoaded", ()=>{
   // alert("Cargando productos...");
   getProducts();
});

async function getProducts(){
    try {
        let url = "http://localhost:3000/api/productos";
     let respuesta = await fetch(url,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Validar la respuesta
        if (respuesta.status === 204) {
            console.log("No hay productos disponibles.");
        } else{
            let data = await respuesta.json();
            console.log(data);
            data.forEach((producto, index) => {
                let row = tablepro.insertRow();
                row.insertCell(0).textContent = index + 1;
                row.insertCell(1).textContent = producto.nombre;
                row.insertCell(2).textContent = producto.descripcion;
                row.insertCell(3).textContent = producto.precio;
                row.insertCell(4).textContent = producto.stock;
                row.insertCell(5).innerHTML = `<img src="${producto.imagen}" alt="Imagen del producto" width="80">`;
                row.insertCell(6).innerHTML = `<button class="btn btn-primary btn-sm">✍</button>
                                              <button class="btn btn-danger btn-sm">💀</button>`;
            });
        }  

    } catch (error) {
        console.log(error);

    }
}
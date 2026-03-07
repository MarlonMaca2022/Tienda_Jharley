//variables globales

let tablepro = document.querySelector("#tablepro");
let searchInput = document.getElementById("search-input");
let nameUser = document.querySelector("#nombre-usuario");
let btnLogout = document.getElementById("btnLogout");

//funcion para poner el nombre
let getUser = ()=>{
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.textContent = user.usuario; 
};

//Evento para el logout
btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("userLogin");
    location.href="login.html"
});

searchInput.addEventListener("keyup", ()=>{
   searchProductTable();
});

document.addEventListener("DOMContentLoaded", ()=>{
   // alert("Cargando productos...");
   getProducts();
   getUser(); 
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

            localStorage.setItem("datosTabla", JSON.stringify(data));

            data.forEach((producto, index) => {
                let row = tablepro.insertRow();
                row.insertCell(0).textContent = index + 1;
                row.insertCell(1).textContent = producto.nombre;
                row.insertCell(2).textContent = producto.descripcion;
                row.insertCell(3).textContent = producto.precio;
                row.insertCell(4).textContent = producto.stock;
                row.insertCell(5).innerHTML = `<img src="${producto.imagen}" alt="Imagen del producto" width="80">`;
                if(nameUser.textContent === "admin"){
                row.insertCell(6).innerHTML = `<button id="btn-edit" onclick="editDataTable(${index})" type="button" class="btn btn-primary btn-sm">✍</button>
                                              <button id="btn-delete" onclick="deleteDataTable(${index})" type="button" class="btn btn-danger btn-sm">💀</button>`;
                } else
                row.insertCell(6).textContent = "";
            });

        }  

    } catch (error) {
        console.log(error);

    }
   // searchProductTable();
}


window.editDataTable = (pos)=>{
    let products = []
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));

    if (productsSave != null) {
        products = productsSave;
    }
    let singleProduct = products[pos];
    localStorage.setItem("productoEdit", JSON.stringify(singleProduct));
    localStorage.removeItem("datosTabla");
    location.href = "../crear-pro.html";
}

window.deleteDataTable = (pos)=>{
    let products = []
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));

    if (productsSave != null) {
        products = productsSave;
    }
    let singleProduct = products[pos];
    let IDproduct={id: singleProduct.id}
    let confirmar = confirm(`¿Está seguro de eliminar el producto ${singleProduct.nombre}?`);
    if (confirmar) {
        sendDeleteProduct(IDproduct);
    }
}

async function sendDeleteProduct(id) {
    let url = `http://localhost:3000/api/productos/${id.id}`;
    try {
        let respuesta = await fetch(url, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(id)
        });
        if (respuesta.status===406){
            alert("el id enviado no es valido, por favor revise el producto");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.reload();
        }
        
    } catch (error) {
        console.log(error);
    }

}

//funcion para quitar productos de la tabla
function clearDataTable(){
    while(tablepro.rows.length > 0) {
        tablepro.deleteRow(0);
    }
};

//funcion para buscar un product de la tabla
function searchProductTable(){
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSave != null) {
        products = productsSave;
    }

    //obtener lo escrito en campo de texto
    let textSearch = searchInput.value.toLowerCase();

    clearDataTable();
    let i = 0;
    for (const pro of products) {
        if(pro.nombre.toLowerCase().indexOf(textSearch) !== -1 || pro.descripcion.toLowerCase().indexOf(textSearch) !== -1){
            let row = tablepro.insertRow();
            row.insertCell(0).textContent = pro.id;
            row.insertCell(1).textContent = pro.nombre;
            row.insertCell(2).textContent = pro.descripcion;
            row.insertCell(3).textContent = pro.precio;
            row.insertCell(4).textContent = pro.stock;
            row.insertCell(5).innerHTML = `<img src="${pro.imagen}" alt="Imagen del producto" width="80">`;
            if(nameUser.textContent === "admin"){
                row.insertCell(6).innerHTML = `<button id="btn-edit" onclick="editDataTable(${i})" type="button" class="btn btn-primary btn-sm">✍</button>
                                              <button id="btn-delete" onclick="deleteDataTable(${i})" type="button" class="btn btn-danger btn-sm">💀</button>`;
            } else
                row.insertCell(6).textContent = "";
   
        }
    }
};
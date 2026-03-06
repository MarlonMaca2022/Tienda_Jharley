const d = document;
let nameInput = d.getElementById("productos-select");
let priceInput = d.getElementById("precio-pro");
let stockInput = d.getElementById("stock-pro");
let desInput = d.getElementById("des-pro");
let imagenInput = d.getElementById("imagen-pro");
let createBtn = d.querySelector(".btn-create");
let productUpdate;

createBtn.addEventListener("click", async () => {
    let dataProduct = getDataProduct();
    sendDataProduct(dataProduct);
});

d.addEventListener("DOMContentLoaded", () => {
    productUpdate = JSON.parse(localStorage.getItem("productoEdit"));
    if (productUpdate != null) {
        nameInput.value = productUpdate.nombre;
        priceInput.value = productUpdate.precio;
        stockInput.value = productUpdate.stock;
        desInput.value = productUpdate.descripcion;
        imagenInput.src = productUpdate.imagen;
        let product;

        let btnEdit = d.querySelector(".btn-update");
        createBtn.classList.toggle("d-none");
        btnEdit.classList.toggle("d-none");

        btnEdit.addEventListener("click", () => {
            product = {
                id: productUpdate.id,
                nombre: nameInput.value,
                descripcion: desInput.value,
                precio: priceInput.value,
                stock: stockInput.value,
                imagen: imagenInput.src
            }
            localStorage.removeItem("productoEdit");
            sendUpdateProduct(product);
        });


    }
});

async function sendUpdateProduct(pro) {
    let url = `http://localhost:3000/api/productos/${pro.id}`;
    try {
        let respuesta = await fetch(url, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(pro)
        });
        if (respuesta.status===406){
            alert("Los datos ingresados no son validos, por favor revise el formulario");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = "../listado-pro.html";
        }

        
    } catch (error) {
        console.log(error);
    }
}

let getDataProduct = ()=>{
    //validar formulario
    let product;
    if(nameInput.value && priceInput.value && stockInput.value && desInput.value && imagenInput.src){
       product = {
        nombre: nameInput.value,
        descripcion: desInput.value,
        precio: priceInput.value,
        stock: stockInput.value,
        imagen: imagenInput.src
       }
       priceInput.value="";
       stockInput.value="";
       desInput.value="";
       imagenInput.src="https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
    }else{
        alert("Debe completar todos los campos")
    }
    console.log(product);
    return product;
};

let sendDataProduct = async  (data)=>{
    let url = "http://localhost:3000/api/productos";
    try {
        let respuesta = await fetch(url, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
        });
        if (respuesta.status===406){
            alert("Los datos ingresados no son validos, por favor revise el formulario");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = "../listado-pro.html";
        }

        
    } catch (error) {
        console.log(error);
    }
};



// variables globales
const d = document;
let userInput = d.getElementById("usuarioForm");
let passInput = d.getElementById("contraForm");
let btnLogin = d.querySelector(".btnLogin");

// evento click del boton login
btnLogin.addEventListener("click",  () => {
    //alert("Voy bien chidori "+ userinput.value + " " + passInput.value);
    let dataForm = getData();
    sendData(dataForm);
});

//Validación del formulario
//Obtener datos del formulario

let getData = ()=>{
    //validar formulario
    let user;
    if(userInput.value && passInput.value){
       user = {
        usuario: userInput.value,
        contrasena: passInput.value
       }
       userInput.value="";
       passInput.value="";
    }else{
        alert("Debe completar ambos campos")
    }
    console.log(user);
    return user;
};

//funcion para recibir los datos
//realizar la peticion al servidor

let sendData = async  (data)=>{
    let url = "http://localhost:3000/api/login";

    try {
        let respuesta = await fetch(url, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
        });
        let userLogin = respuesta.json();
        console.log("El usuario es: "+userLogin);
    
    } catch (error) {
        console.log(error);
    }

   

};
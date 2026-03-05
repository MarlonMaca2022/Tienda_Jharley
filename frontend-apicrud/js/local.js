//Variables globales de admin
const d = document;
let nameUser = document.querySelector("#nombre-usuario");
let btnLogout = document.querySelector("#btnLogout");

//Evento para recargar la pagina y aparezca el nombre del usuario
d.addEventListener("DOMContentLoaded", ()=>{ 
   getUser(); 
})

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
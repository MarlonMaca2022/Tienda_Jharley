// variables globales
const d = document;
let userinput = d.getElementById("usuarioForm");
let passInput = d.getElementById("contraForm");
let btnLogin = d.querySelector(".btnLogin");

// evento click del boton login
btnLogin.addEventListener("click",  () => {
    alert("Voy bien chidori "+ userinput.value + " " + passInput.value);
});
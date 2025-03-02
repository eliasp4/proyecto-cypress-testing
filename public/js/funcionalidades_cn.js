document.addEventListener("DOMContentLoaded", function() {
    // Obtener datos del usuario desde localStorage
    const name = localStorage.getItem("fullName") || "Usuario";
    const email = localStorage.getItem("email") || "No disponible";
    const dob = localStorage.getItem("dateOfBirth") || "No proporcionada";

    // Mostrar la información en la página
    document.getElementById("userName").textContent = name;
    document.getElementById("name").textContent = name;
    document.getElementById("email").textContent = email;
    document.getElementById("dob").textContent = dob;
});
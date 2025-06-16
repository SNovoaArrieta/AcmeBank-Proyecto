// Mostrar nombre y número de cuenta del usuario
const nombre = localStorage.getItem("nombreUsuario");
const numeroCuenta = localStorage.getItem("numeroCuenta");

if (nombre && numeroCuenta) {
    document.getElementById("nombreusuario3").textContent = nombre.toUpperCase();
    document.getElementById("cuentausuario3").textContent = `Cuenta No. ${numeroCuenta}`;
} else {
    alert("⚠️ No se encontró información del usuario. Vuelve a iniciar sesión.");
    // Opcional: window.location.href = "login.html";
}

// Acción del botón ACEPTAR
document.getElementById("botonaceptar4").addEventListener("click", function () {
    const anio = document.getElementById("anio").value;
    if (!anio || anio < 2020 || anio > 2025) {
        alert("Por favor ingresa un año válido entre 2020 y 2025.");
        return;
    }

    // Aquí puedes guardar el año en localStorage o usarlo para filtrar transacciones
    localStorage.setItem("anioSeleccionado", anio);

    // Redirigir a otra página con los extractos de ese año
    window.location.href = "comprobante-extracto.html";
});

// Acción del botón CANCELAR
document.getElementById("botoncancelar4").addEventListener("click", function () {
    window.location.href = "inicio.html";
});
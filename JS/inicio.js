import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAyVF_iOgpDKTQco5Y9ZqmURB0YAd6TMhs",
    authDomain: "acme-bank-a0686.firebaseapp.com",
    projectId: "acme-bank-a0686",
    storageBucket: "acme-bank-a0686.appspot.com",
    messagingSenderId: "302724149232",
    appId: "1:302724149232:web:9a84221b967416e2933735"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const idUsuario = localStorage.getItem("idUsuario");

function mostrarSaldo(valor) {
    const saldoFormateado = Number(valor).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    });
    document.getElementById("saldoDisponible").textContent = saldoFormateado;
}

async function cargarDatosUsuario() {
    if (!idUsuario) {
        console.error("No hay ID de usuario en localStorage");
        return;
    }

    try {
        const docRef = doc(db, "usuarios", idUsuario);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.error("El usuario no existe en Firebase.");
            return;
        }

        const datos = docSnap.data();

        document.getElementById("nombreUsuario").textContent = datos.nombre?.toUpperCase() || "USUARIO";
        document.getElementById("numeroCuenta").textContent = `# ${datos.numeroCuenta || "00000000"}`;

        let saldo = datos.saldo;

        if (!saldo || saldo === 0) {
            saldo = Math.floor(Math.random() * (999000 - 100000 + 1)) + 100000;
            await updateDoc(docRef, { saldo });
            localStorage.setItem("saldoDisponible", saldo);
        }

        mostrarSaldo(saldo);
    } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
    }
}

window.toggleMenu = function () {
    const menu = document.getElementById("menuDesplegable");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
};

window.addEventListener("click", function (e) {
    const menu = document.getElementById("menuDesplegable");
    const button = document.querySelector(".menu-icono");
    if (!menu.contains(e.target) && !button.contains(e.target)) {
        menu.style.display = "none";
    }
});

// ✅ Función para cerrar sesión
window.cerrarSesion = function () {
    localStorage.removeItem("idUsuario");
<<<<<<< HEAD
    window.location.href = "inicio-secion.html";
=======
    window.location.href = "../Temples/inicio-secion.html";
>>>>>>> Brayan
};

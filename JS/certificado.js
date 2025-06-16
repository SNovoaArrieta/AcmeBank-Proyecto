
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

const identificacion = localStorage.getItem("idUsuario");
const nombreEl = document.getElementById("nombreUsuario");
const cuentaEl = document.getElementById("numeroCuenta");
const fechaEl = document.getElementById("fechaActual");

async function cargarCertificado() {
    if (!identificacion) {
        nombreEl.textContent = "USUARIO NO IDENTIFICADO";
        cuentaEl.textContent = "Cuenta no disponible";
        return;
    }

    const docRef = doc(db, "usuarios", identificacion);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        nombreEl.textContent = data.nombre?.toUpperCase() || "Nombre no disponible";
        cuentaEl.textContent = data.numeroCuenta || "No disponible";
    } else {
        nombreEl.textContent = "USUARIO NO ENCONTRADO";
        cuentaEl.textContent = "Cuenta no disponible";
    }

    // Mostrar fecha actual
    const fecha = new Date().toLocaleString("es-CO", {
        day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
    fechaEl.textContent = fecha;
}

cargarCertificado();

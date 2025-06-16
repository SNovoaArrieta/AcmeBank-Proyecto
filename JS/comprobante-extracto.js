// JS/comprobante-extracto.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js";

// 🔐 Configura tu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAyVF_iOgpDKTQco5Y9ZqmURB0YAd6TMhs",
    authDomain: "acme-bank-a0686.firebaseapp.com",
    projectId: "acme-bank-a0686",
    storageBucket: "acme-bank-a0686.appspot.com",
    messagingSenderId: "302724149232",
    appId: "1:302724149232:web:9a84221b967416e2933735"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Recupera datos del localStorage
const nombre = localStorage.getItem("nombreUsuario") || "No disponible";
const cuenta = localStorage.getItem("numeroCuenta") || "No disponible";
const anio = localStorage.getItem("anioSeleccionado") || "Sin año";
const fecha = new Date().toLocaleDateString();

// Muestra los datos en el comprobante
document.getElementById("nombreUsuario").textContent = nombre.toUpperCase();
document.getElementById("numeroCuenta").textContent = cuenta;
document.getElementById("anioSeleccionado").textContent = anio;
document.getElementById("fechaActual").textContent = fecha;

// Transacciones del año seleccionado
const contenedor = document.getElementById("transacciones");

db.collection("transacciones")
    .where("usuario", "==", cuenta)
    .get()
    .then(snapshot => {
        let hayDatos = false;
        snapshot.forEach(doc => {
            const data = doc.data();
            const fechaDoc = data.fecha.toDate();
            const anioDoc = fechaDoc.getFullYear();

            if (anioDoc == anio) {
                hayDatos = true;
                const item = document.createElement("div");
                item.classList.add("transaccion");
                item.innerHTML = `
          <strong>${data.tipo.toUpperCase()}</strong><br>
          Concepto: ${data.concepto}<br>
          Valor: $${data.valor}<br>
          Fecha: ${fechaDoc.toLocaleDateString()}
        `;
                contenedor.appendChild(item);
            }
        });

        if (!hayDatos) {
            contenedor.innerHTML = "<p>No se encontraron transacciones para el año seleccionado.</p>";
        }
    })
    .catch(error => {
        console.error("Error al obtener transacciones:", error);
        contenedor.innerHTML = "<p>Error al cargar las transacciones.</p>";
    });
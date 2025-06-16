import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore, doc, collection, addDoc, getDoc, updateDoc, Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAyVF_iOgpDKTQco5Y9ZqmURB0YAd6TMhs",
    authDomain: "acme-bank-a0686.firebaseapp.com",
    projectId: "acme-bank-a0686",
    storageBucket: "acme-bank-a0686.firebasestorage.app",
    messagingSenderId: "302724149232",
    appId: "1:302724149232:web:9a84221b967416e2933735"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener datos del usuario desde localStorage
const nombre = localStorage.getItem("nombreUsuario");
const numeroCuenta = localStorage.getItem("numeroCuenta");
const identificacion = localStorage.getItem("idUsuario");

// Mostrar nombre y cuenta si existen
if (nombre && numeroCuenta && identificacion) {
    document.getElementById("nombreusuario2").textContent = nombre.toUpperCase();
    document.getElementById("cuentausuario2").textContent = `Cuenta No. ${numeroCuenta}`;
} else {
    alert("⚠️ No se encontró información del usuario. Vuelve a iniciar sesión.");
}

// Evento del botón ACEPTAR
document.getElementById("botonaceptar3").addEventListener("click", async function () {
    const cantidad = parseFloat(document.getElementById("cantidaddinero2").value);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor ingresa una cantidad válida.");
        return;
    }

    const datos = {
        fecha: Timestamp.fromDate(new Date()), // ✅ fecha como Timestamp real
        referencia: "REF" + Math.floor(Math.random() * 1000000000), // como string
        tipo: "Retiro",
        concepto: "Retiro en canal electrónico",
        valor: Number(cantidad) // ✅ asegurar que es número
    };

    localStorage.setItem("comprobante", JSON.stringify({
        ...datos,
        fecha: new Date().toLocaleString("es-CO") // para mostrar legible en comprobante
    }));

    try {
        const usuarioRef = doc(db, "usuarios", identificacion);
        const usuarioSnap = await getDoc(usuarioRef);

        if (!usuarioSnap.exists()) {
            alert("⚠️ No se encontró el usuario en Firebase.");
            return;
        }

        const datosUsuario = usuarioSnap.data();
        const saldoActual = datosUsuario.saldo || 0;

        if (saldoActual < cantidad) {
            alert("⚠️ Saldo insuficiente.");
            return;
        }

        const nuevoSaldo = saldoActual - cantidad;
        await updateDoc(usuarioRef, { saldo: nuevoSaldo });

        const transaccionesRef = collection(usuarioRef, "transacciones");
        await addDoc(transaccionesRef, datos);

        console.log("✅ Transacción de retiro guardada correctamente.");

        window.open("comprobante.html", "_blank");

    } catch (error) {
        console.error("❌ Error al guardar en Firebase:", error);
        alert("Error al guardar la transacción.");
    }
});

// Evento del botón CANCELAR
document.getElementById("botoncancelar3").addEventListener("click", function () {
    window.location.href = "inicio.html";
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore, doc, collection, addDoc, getDoc, updateDoc, Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// Obtener datos del usuario
const nombre = localStorage.getItem("nombreUsuario");
const cuenta = localStorage.getItem("numeroCuenta");
const identificacion = localStorage.getItem("idUsuario");

if (nombre) document.getElementById("nombreusuario").textContent = nombre.toUpperCase();
if (cuenta) document.getElementById("cuentausuario").textContent = "Cuenta No. " + cuenta;

// Evento ACEPTAR
document.getElementById("botonaceptar2").addEventListener("click", async () => {
    const cantidad = parseFloat(document.getElementById("cantidaddinero").value);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Ingrese una cantidad válida.");
        return;
    }

    const datos = {
        fecha: Timestamp.fromDate(new Date()), // ✅ Fecha en formato Timestamp
        referencia: "REF" + Math.floor(Math.random() * 1000000000), // como string
        tipo: "Consignación",
        concepto: "Consignación por canal electrónico",
        valor: Number(cantidad), // ✅ asegurarse que sea number
        cuenta,
        nombre
    };

    // Guardar comprobante localmente con fecha legible
    localStorage.setItem("comprobante", JSON.stringify({
        ...datos,
        fecha: new Date().toLocaleString("es-CO") // formato legible para mostrar
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

        // Actualizar saldo
        const nuevoSaldo = saldoActual + cantidad;
        await updateDoc(usuarioRef, { saldo: nuevoSaldo });

        // Guardar transacción
        const transaccionesRef = collection(usuarioRef, "transacciones");
        await addDoc(transaccionesRef, datos);

        console.log("✅ Consignación guardada en Firebase");
        window.open("comprobante.html", "_blank");

    } catch (e) {
        console.error("❌ Error al guardar en Firestore:", e);
        alert("Error al guardar la transacción.");
    }
});

// Evento CANCELAR
document.getElementById("botoncancelar2").addEventListener("click", () => {
    window.location.href = "inicio.html";
});

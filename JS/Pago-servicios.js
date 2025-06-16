import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore, doc, collection, addDoc, getDoc, updateDoc,
    Timestamp // ✅ Importamos Timestamp
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

// Obtener datos del usuario desde localStorage
const nombre = localStorage.getItem("nombreUsuario");
const cuenta = localStorage.getItem("numeroCuenta");
const identificacion = localStorage.getItem("idUsuario");

if (nombre) {
    document.getElementById("nombreusuario4").textContent = nombre;
}
if (cuenta) {
    document.getElementById("cuentausuario4").textContent = `Cuenta N° ${cuenta}`;
}

// Acción del botón CANCELAR
document.getElementById("botoncancelar5").addEventListener("click", () => {
    window.location.href = "inicio.html";
});

document.getElementById("botonaceptar5").addEventListener("click", async () => {
    const servicio = document.getElementById("opciones").value;
    const referenciaFactura = document.getElementById("referencia").value;
    const valorFactura = parseFloat(document.getElementById("valorfactura").value);

    if (!servicio || !referenciaFactura || isNaN(valorFactura) || valorFactura <= 0) {
        alert("Por favor completa todos los campos con valores válidos.");
        return;
    }

    const serviciosNombres = {
        1: "Electricidad",
        2: "Agua",
        3: "Gas",
        4: "Internet"
    };

    const referencia = "REF" + Math.floor(Math.random() * 1000000000);
    const tipo = "Pago de servicios";
    const concepto = `Pago de servicio público ${serviciosNombres[servicio]}`;
    const valor = valorFactura;

    // ✅ Guardamos la fecha como timestamp en Firestore
    const fecha = Timestamp.now();

    const datos = {
        fecha,
        referencia,
        tipo,
        concepto,
        valor
    };

    // ✅ Guardamos también en localStorage pero como string legible para mostrar en comprobante
    localStorage.setItem("comprobante", JSON.stringify({
        fecha: new Date().toLocaleString("es-CO"),
        referencia,
        tipo,
        concepto,
        valor
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

        if (saldoActual < valor) {
            alert("⚠️ Saldo insuficiente para realizar este pago.");
            return;
        }

        const nuevoSaldo = saldoActual - valor;
        await updateDoc(usuarioRef, { saldo: nuevoSaldo });

        const transaccionesRef = collection(usuarioRef, "transacciones");
        await addDoc(transaccionesRef, datos);

        console.log("✅ Transacción de servicio guardada en Firebase.");
        window.open("comprobante.html", "_blank");

    } catch (error) {
        console.error("❌ Error al guardar en Firebase:", error);
        alert("Error al guardar la transacción.");
    }
});
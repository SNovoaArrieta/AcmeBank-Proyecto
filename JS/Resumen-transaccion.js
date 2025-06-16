import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
const identificacionUsuario = localStorage.getItem("idUsuario");

async function cargarDatosUsuario() {
    if (!identificacionUsuario) return;
    const docRef = doc(db, "usuarios", identificacionUsuario);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const datos = docSnap.data();
        document.getElementById("nombreUsuario").textContent =
            datos.nombre?.toUpperCase() || "USUARIO";
        document.getElementById("numeroCuenta").textContent =
            `Cuenta: # ${datos.numeroCuenta || 'No disponible'}`;
    } else {
        document.getElementById("nombreUsuario").textContent = "USUARIO NO ENCONTRADO";
    }
}

async function cargarTransacciones() {
    const contenedor = document.getElementById("listaTransacciones");

    if (!identificacionUsuario) {
        contenedor.innerHTML = "<p>Usuario no identificado.</p>";
        return;
    }

    const transRef = collection(doc(db, "usuarios", identificacionUsuario), "transacciones");
    const q = query(transRef, orderBy("fecha", "desc"), limit(10));

    try {
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            contenedor.innerHTML = "<p>No hay transacciones registradas.</p>";
            return;
        }

        let html = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            const fecha = data.fecha && data.fecha.toDate
                ? data.fecha.toDate().toLocaleString()
                : "Fecha no disponible";
                html += `
          <div class="transaccion">
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Referencia:</strong> ${data.referencia}</p>
            <p><strong>Tipo:</strong> ${data.tipo}</p>
            <p><strong>Concepto:</strong> ${data.concepto}</p>
            <p><strong>Valor:</strong> $${data.valor.toLocaleString()}</p>
          </div>`;
        });

        contenedor.innerHTML = html;
    } catch (e) {
        console.error("Error obteniendo transacciones:", e);
        contenedor.innerHTML = "<p>Error cargando transacciones.</p>";
    }
}

document.getElementById("botonimprimir1").addEventListener("click", () => {
    window.print();
});

cargarDatosUsuario();
cargarTransacciones(); cargarDatosUsuario
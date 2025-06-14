import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
const form = document.getElementById("formUsuario");

// 🔢 Función para generar número de cuenta aleatorio
function generarNumeroCuenta() {
  const prefijo = "41"; // puedes cambiarlo según el formato de tu banco
  const numeroAleatorio = Math.floor(100000000 + Math.random() * 900000000); // 9 dígitos
  return prefijo + numeroAleatorio; // Total: 11 dígitos con prefijo
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const tipoId = document.getElementById("tipoId").value;
  const identificacion = document.getElementById("identificacion").value;
  const genero = document.getElementById("genero").value;
  const telefono = document.getElementById("telefono").value;
  const correo = document.getElementById("correo").value;
  const direccion = document.getElementById("direccion").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmarContrasena = document.getElementById("confirmarContrasena").value;

  if (contrasena !== confirmarContrasena) {
    alert("❌ Las contraseñas no coinciden.");
    return;
  }

  // 🔢 Generar número de cuenta aleatorio (9 dígitos)
  const numeroCuenta = Math.floor(100000000 + Math.random() * 900000000).toString();

  try {
    await setDoc(doc(db, "usuarios", identificacion), {
      nombre,
      apellidos,
      tipoId,
      identificacion,
      genero,
      telefono,
      correo,
      direccion,
      contrasena,
      numeroCuenta,
      creado: new Date().toISOString()
    });

    // Guardar el ID del usuario en localStorage para usarlo en PreCuenta
    localStorage.setItem("idUsuario", identificacion);

    // ✅ Redirigir a la vista de la cuenta
    window.location.href =  "/Temples/preCuenta.html";

  } catch (error) {
    console.error("❌ Error al guardar:", error);
    alert("Hubo un error al registrar el usuario.");
  }
});


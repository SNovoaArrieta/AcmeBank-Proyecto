import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

const formLogin = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identificacion = document.getElementById("identificacion").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  try {
    const docRef = doc(db, "usuarios", identificacion);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const usuario = docSnap.data();

      if (usuario.contrasena === contrasena) {
        mensaje.textContent = "✅ Acceso concedido.";
        mensaje.style.color = "green";

        // Guardar datos del usuario en localStorage
        localStorage.setItem("idUsuario", identificacion);
        localStorage.setItem("nombreUsuario", usuario.nombre || "");
        localStorage.setItem("numeroCuenta", usuario.numeroCuenta || "");

        // Redirigir al inicio
        window.location.href = "../HTML/inicio.html";
      } else {
        mensaje.textContent = "❌ Contraseña incorrecta.";
        mensaje.style.color = "red";
      }
    } else {
      mensaje.textContent = "❌ Usuario no registrado.";
      mensaje.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    mensaje.textContent = "❌ Error al iniciar sesión.";
    mensaje.style.color = "red";
  }
});

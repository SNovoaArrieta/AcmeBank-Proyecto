import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔧 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAyVF_iOgpDKTQco5Y9ZqmURB0YAd6TMhs",
  authDomain: "acme-bank-a0686.firebaseapp.com",
  projectId: "acme-bank-a0686",
  storageBucket: "acme-bank-a0686.firebasestorage.app",
  messagingSenderId: "302724149232",
  appId: "1:302724149232:web:9a84221b967416e2933735"
};

// 🚀 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🧾 Referencia al formulario y mensaje
const formLogin = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identificacion = document.getElementById("identificacion").value;
  const contrasena = document.getElementById("contrasena").value;

  try {
    const docRef = doc(db, "usuarios", identificacion);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const usuario = docSnap.data();

      if (usuario.contrasena === contrasena) {
        // ✅ Acceso correcto
        mensaje.textContent = "✅ Acceso concedido.";
        mensaje.style.color = "green";

        // 💾 Guardar el ID del usuario
        localStorage.setItem("idUsuario", identificacion);

        // 🔁 Redirigir a preCuenta.html
        window.location.href = "/Temples/preCuenta.html";
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

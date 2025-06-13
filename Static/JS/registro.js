import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


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


 try {
   // Guardar usando el número de identificación como ID del documento
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
     creado: new Date().toISOString()
   });


   alert("✅ Usuario registrado con ID: " + identificacion);
   form.reset();


 } catch (error) {
   console.error("❌ Error al guardar:", error);
   alert("Hubo un error al registrar el usuario.");
 }
});

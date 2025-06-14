
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  // ⚙️ Configuración de Firebase
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

  // 🧠 Recuperar el ID del usuario (puede haber sido guardado tras el registro)
  const idUsuario = localStorage.getItem("idUsuario");

  if (idUsuario) {
    const docRef = doc(db, "usuarios", idUsuario);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const datos = docSnap.data();

      // 🧾 Mostrar los datos en la tarjeta
      document.getElementById("nombreUsuario").textContent = `${datos.nombre} ${datos.apellidos}`;
      document.getElementById("numeroCuenta").textContent = `#${datos.numeroCuenta}`;

      const fecha = new Date(datos.creado);
      const fechaFormateada = fecha.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
      document.getElementById("fechaRegistro").textContent = fechaFormateada;

    } else {
      console.error("❌ No se encontró el usuario.");
    }
  } else {
    console.warn("⚠️ No se encontró un ID de usuario en localStorage.");
  }


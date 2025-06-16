import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de Firebase
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

// Elementos del DOM
const formRecuperar = document.getElementById('form-recuperar');
const formNuevaClave = document.getElementById('form-nueva-clave');
const tipoId = document.getElementById('tipoId');
const identificacion = document.getElementById('identificacion');
const correo = document.getElementById('correo');
const mensaje = document.getElementById('mensaje');
const btnCancelar = document.getElementById('btn-cancelar');

// Mostrar/ocultar contraseñas
document.addEventListener('DOMContentLoaded', () => {
  const toggleNewPassword = document.getElementById('toggleNewPassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  toggleNewPassword.addEventListener('click', () => {
    const type = newPasswordInput.type === 'password' ? 'text' : 'password';
    newPasswordInput.type = type;
    toggleNewPassword.textContent = type === 'password' ? '👁️' : '🙈';
  });

  toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    confirmPasswordInput.type = type;
    toggleConfirmPassword.textContent = type === 'password' ? '👁️' : '🙈';
  });
});

// Validar datos del usuario
formRecuperar.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = identificacion.value.trim();

  try {
    const docRef = doc(db, 'usuarios', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      mensaje.textContent = '⚠️ No se encontró ningún usuario con esa identificación.';
      return;
    }

    const data = docSnap.data();

    if (data.tipoId === tipoId.value && data.correo === correo.value.trim()) {
      // Ocultar el formulario de recuperación y mostrar el de nueva contraseña
      formRecuperar.style.display = 'none';
      formNuevaClave.style.display = 'block';

      // Guardar referencia al documento para actualización posterior
      formNuevaClave.dataset.docId = id;
    } else {
      mensaje.textContent = '⚠️ La información no coincide con ningún usuario registrado.';
    }

  } catch (error) {
    console.error('Error al buscar el documento:', error);
    mensaje.textContent = '❌ Error al validar la información.';
  }
});

// Cambiar contraseña
formNuevaClave.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevaClave = document.getElementById('newPassword').value.trim();
  const confirmarClave = document.getElementById('confirmPassword').value.trim();
  const docId = formNuevaClave.dataset.docId;

  if (nuevaClave !== confirmarClave) {
    mensaje.textContent = '⚠️ Las contraseñas no coinciden.';
    return;
  }

  try {
    const docRef = doc(db, 'usuarios', docId);
    await updateDoc(docRef, {
      contrasena: nuevaClave
    });

    mensaje.textContent = '✅ Contraseña actualizada correctamente. Redirigiendo...';
    setTimeout(() => {
      window.location.href = '/Temples/inicio-secion.html'; // Redirigir al inicio de sesión
    }, 2000);
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    mensaje.textContent = '❌ No se pudo actualizar la contraseña.';
  }
});

// Cancelar
btnCancelar.addEventListener('click', () => {
  window.location.href = '/Temples/inicio-secion.html';
});

import { auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from './firebase.js';

// Iniciar sesión con Google
document.getElementById("googleLogin").addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        console.log(`Bienvenido ${result.user.displayName}`);
    }).catch((error) => {
        console.error("Error de autenticación: ", error);
    });
});

// Iniciar sesión con Facebook
document.getElementById("facebookLogin").addEventListener("click", () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        console.log(`Bienvenido ${result.user.displayName}`);
    }).catch((error) => {
        console.error("Error de autenticación: ", error );
    });
});

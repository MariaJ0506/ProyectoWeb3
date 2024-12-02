import { db, storage, collection, addDoc, getDocs, ref, uploadBytes, getDownloadURL } from './firebase.js';

// Función para agregar una investigación a Firestore
async function addResearch(researchData) {
    try {
        const docRef = await addDoc(collection(db, "researches"), researchData);
        console.log("Investigación agregada con ID: ", docRef.id);
    } catch (e) {
        console.error("Error al agregar investigación: ", e);
    }
}

// Función para subir archivos a Firebase Storage
async function uploadFile(file) {
    const storageRef = ref(storage, 'uploads/' + file.name); // Ruta en Firebase Storage

    try {
        // Subir archivo
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Archivo subido con éxito: ', snapshot);
        
        // Obtener URL de descarga
        const fileURL = await getDownloadURL(snapshot.ref);
        console.log('Archivo disponible en: ', fileURL);
        return fileURL; // Retorna la URL para usarla en Firestore
    } catch (error) {
        console.error("Error al subir el archivo: ", error);
        return null;
    }
}

// Función para manejar la creación de una nueva investigación
const addResearchForm = document.getElementById("addResearchForm");

addResearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const title = document.getElementById("title").value;
    const area = document.getElementById("area").value;
    const description = document.getElementById("description").value;
    const conclusions = document.getElementById("conclusions").value;
    const recommendations = document.getElementById("recommendations").value;
    
    // Subir los archivos a Firebase Storage (PDF y imágenes)
    const documentFile = document.getElementById("documentFile").files[0];
    const imagesFiles = document.getElementById("imagesFiles").files;

    const documentUrl = documentFile ? await uploadFile(documentFile) : null;
    const imagesUrls = [];

    // Subir imágenes
    for (const imageFile of imagesFiles) {
        const imageUrl = await uploadFile(imageFile);
        if (imageUrl) {
            imagesUrls.push(imageUrl);
        }
    }

    // Crear objeto con la información de la investigación
    const researchData = {
        title,
        area,
        description,
        conclusions,
        recommendations,
        documentUrl, // URL del documento PDF subido
        images: imagesUrls, // URLs de las imágenes subidas
        authorId: firebase.auth().currentUser.uid, // ID del usuario autenticado
    };

    // Llamar la función para agregar la investigación a Firestore
    await addResearch(researchData);
});

// Función para obtener todas las investigaciones de Firestore
async function loadResearches() {
    const researchList = document.getElementById("researchList");
    researchList.innerHTML = ""; // Limpiar el listado antes de cargar nuevos datos

    try {
        const querySnapshot = await getDocs(collection(db, "researches"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const researchItem = document.createElement("div");
            researchItem.innerHTML = `
                <h3>${data.title}</h3>
                <p><strong>Área:</strong> ${data.area}</p>
                <p>${data.description}</p>
                <p><strong>Conclusiones:</strong> ${data.conclusions}</p>
                <p><strong>Recomendaciones:</strong> ${data.recommendations}</p>
                <a href="research.html?id=${doc.id}">Ver detalles</a>
            `;
            researchList.appendChild(researchItem);
        });
    } catch (e) {
        console.error("Error al obtener investigaciones: ", e);
    }
}

// Llamar la función para cargar investigaciones cuando la página se cargue
window.addEventListener('DOMContentLoaded', loadResearches);

import { db, collection, getDocs } from './firebase.js';

const researchList = document.getElementById("researchList");

async function loadResearches() {
    const querySnapshot = await getDocs(collection(db, "researches"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const researchItem = document.createElement("div");
        researchItem.innerHTML = `
            <h3>${data.title}</h3>
            <p>Área: ${data.area}</p>
            <p>${data.description}</p>
            <a href="research.html?id=${doc.id}">Ver detalles</a>
        `;
        researchList.appendChild(researchItem);
    });
}

loadResearches();

const CLE_SEANCES = "football_seances";
const CLE_REPONSES = "football_reponses";

let seances = JSON.parse(localStorage.getItem(CLE_SEANCES)) || [];
let reponsesJoueurs = JSON.parse(localStorage.getItem(CLE_REPONSES)) || [];

// ===== CREER SEANCE =====
function creerSeance() {
    const date = document.getElementById("date").value;
    const heure = document.getElementById("heure").value;
    const lieu = document.getElementById("lieu").value;
    const categorie = document.getElementById("categorieSeance").value;

    if(!date || !heure || !lieu || !categorie) { alert("Merci de remplir tous les champs"); return; }

    seances.push({ date, heure, lieu, categorie });
    localStorage.setItem(CLE_SEANCES, JSON.stringify(seances));
    document.getElementById("confirmation").innerText = `Séance créée ✅ ${categorie} le ${date} à ${heure} (${lieu})`;
}

// ===== JOUEUR =====
function mettreAJourSeances() {
    const categorie = document.getElementById("categorie").value;
    const seanceSelect = document.getElementById("seance");
    seanceSelect.innerHTML = "<option value=''>-- Sélectionnez la séance --</option>";

    const seancesDisponibles = seances.filter(s => s.categorie === categorie);
    seancesDisponibles.forEach(s => {
        const option = document.createElement("option");
        option.value = `${s.date}|${s.heure}|${s.lieu}`;
        option.text = `${s.date} - ${s.heure} (${s.lieu})`;
        seanceSelect.appendChild(option);
    });
}

function envoyerReponse() {
    const categorie = document.getElementById("categorie").value;
    const seanceChoisie = document.getElementById("seance").value;
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const presence = document.getElementById("presence").value;
    const stress = document.getElementById("stress").value;
    const fatigue = document.getElementById("fatigue").value;

    if(!categorie || !seanceChoisie || !prenom || !nom || !presence || !stress || !fatigue) {
        alert("Merci de remplir tous les champs et sélectionner votre catégorie et séance");
        return;
    }

    const [date, heure, lieu] = seanceChoisie.split("|");

    reponsesJoueurs.push({
        categorie, prenom, nom, presence:parseInt(presence),
        stress:parseInt(stress), fatigue:parseInt(fatigue),
        rpe:null, date, heure, lieu
    });
    localStorage.setItem(CLE_REPONSES, JSON.stringify(reponsesJoueurs));
    document.getElementById("message").innerText = `Réponse envoyée ✅ ${prenom} ${nom} (${categorie})`;

    document.getElementById("prenom").value = "";
    document.getElementById("nom").value = "";
    document.getElementById("presence").value = "";
    document.getElementById("stress").value = "";
    document.getElementById("fatigue").value = "";
    document.getElementById("categorie").value = "";
    document.getElementById("seance").innerHTML = "<option value=''>-- Sélectionnez la séance --</option>";
}

function envoyerRPE() {
    const rpe = document.getElementById("rpe").value;
    if(!rpe) { alert("Merci de saisir le RPE"); return; }
    if(reponsesJoueurs.length===0) { alert("Aucune réponse !"); return; }
    reponsesJoueurs[reponsesJoueurs.length-1].rpe = parseInt(rpe);
    localStorage.setItem(CLE_REPONSES, JSON.stringify(reponsesJoueurs));
    document.getElementById("messageRPE").innerText = `RPE envoyé ✅ ${reponsesJoueurs[reponsesJoueurs.length-1].prenom}`;
    document.getElementById("rpe").value = "";
}

// ===== Tableau, filtre, export, stats =====
// (Reprendre les fonctions afficherTableau(), supprimerReponse(), exportCSV(), imprimerTableau(), genererStats() comme dans la version précédente)

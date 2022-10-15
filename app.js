const express = require('express');

// Je crée mon application express
const app = express();

// ------------- MIDDLEWARES ------------------------
app.use((req, res, next) => {
    console.log('requête reçue !');
    // J'appel next pour renvoyer la réponse au prochaine middleware
    next();
});

app.use((req, res, next) => {
    // Je modifie le code de la réponse http
    res.status(201);
    next();
});

// Je configure une réponse à mon application
app.use((req, res, next) => {
    // Lors d'une requête au serveur je recupére un objet json
    res.json({ message : "Votre requête à bien été reçue"});
    next();
});

app.use((req , res) => {
    console.log('Réponse envoyé avec succés !');
});

// J'exporte cette application pour y accèder depuis les autres fichiers du projet (server node)
module.exports = app;
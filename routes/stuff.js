// Je crée un router
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// J'importe le schéma des choses
const stuffCtrl = require('../controllers/stuff')

// ------------- MIDDLEWARES ------------------------
/*app.use((req, res, next) => {
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
*/

// Logique de ma route POST
router.post('/', auth, multer, stuffCtrl.createThing); 
// J'ajoute une route qui ne repond qu'aux requêtes PUT
// J'utilise la méthode updateOne dans le model Things qui permet de mettre à jour le Thing qui corréspond a l'objet
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
// J'ajoute une route qui ne repond qu'aux requêtes DELETE
// J'utilise la méthode deleteOne dans le model Things qui permet de supprimer le Thing qui corréspond a l'objet
router.delete('/:id', auth, stuffCtrl.deleteThing);
// Intercèpte uniquement les requêtes GET a cette endpoint
// J'utilise les deux points ':' pour rendre la route accèssible en tant que paramètre
router.get('/', auth, stuffCtrl.getOneThing);

// Intercèpte uniquement les requêtes GET a cette endpoint
router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;
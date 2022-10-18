const express = require('express');

// Je crée mon application express
const app = express();

// J'importe Mongoose
const mongoose = require('mongoose');
const Things = require('./models/Things');

// J'importe le schéma des choses
const Thing = require('./models/Things')

// Je connecte mon API à ma base de données
mongoose.connect('mongodb+srv://Skizx:sarcelles95@cluster0.lgvafq7.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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

// Intercèpte toute les requêtes qui contienne du json et nous mettent a disposition ce contenu sur l'objet requête dans req.body
app.use(express.json());

app.use((req, res, next) => {
    // On dit que l'origine pouvant acceder à l'API sera "*" Tout le monde 
    res.setHeader('Access-Control-Allow-Origin', '*');
    // On donne l'autorisation d'utiliser certain en-tête
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Ainsi que sur certaine méthode "Verbe de requête"
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// Logique de ma route POST
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Things({
        ...req.body
    })
    thing.save()
    .then(() => res.status(201).json({ message: 'Object enregistré !'}))
    .catch( error => res.status(400).json ({ error }));
});

// Intercèpte uniquement les requêtes GET a cette endpoint
// J'utilise les deux points ':' pour rendre la route accèssible en tant que paramètre
app.get('/api/stuff/:id', (req, res, next) => {
    Things.findOne({ _id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error}));
})

// Intercèpte uniquement les requêtes GET a cette endpoint
app.get('/api/stuff', (req, res, next) => {
   /* const stuff = [
        {
            _id : 'oeihfzer',
            title : 'Mon premier objet',
            description : 'Les informations de mon premier objet',
            imageUrl : 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price : 4900,
            userId : 'qsomihvquois'
        },
        {
            _id : 'oeihzerdeu',
            title : 'Mon deuxieme objet',
            description : 'Les informations de mon deuxieme objet',
            imageUrl : 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price : 2900,
            userId : 'qsomihvquoisdeu'
        },
    ];
    res.status(200).json(stuff);*/

    // J'utilise la méthode find() afin de retourner un tableau contenant tous les Things dans notre base de données
    Things.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error}));
});
// J'exporte cette application pour y accèder depuis les autres fichiers du projet (server node)
module.exports = app;
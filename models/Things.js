const mongoose = require('mongoose');

// Je crée un schéma de données qui contient les champs souhaités pour chaque Thing, indique leur type ainsi que leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    userId: { type: String, required: true},
    price: { type: Number, required: true},
});

// J'exporte le schéma en tant que modèle mongoose appelé "Thing" le randant disponible pour l'application Express
module.exports = mongoose.model('Things', thingSchema);
const express = require('express');
//
const bodyParser = require('body-parser');
// Je crée mon application express
const app = express();
// J'importe Mongoose
const mongoose = require('mongoose');
// J'importe le router
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// Je connecte mon API à ma base de données
mongoose.connect('mongodb+srv://Skizx:sarcelles95@cluster0.lgvafq7.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use((req, res, next) => {
  // On dit que l'origine pouvant acceder à l'API sera "*" Tout le monde 
  res.setHeader('Access-Control-Allow-Origin', '*');
  // On donne l'autorisation d'utiliser certain en-tête
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Ainsi que sur certaine méthode "Verbe de requête"
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
  
  // J'importe le router exporté par le stuff.js
  app.use(bodyParser.json());
  
  
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes);
  // J'exporte cette application pour y accèder depuis les autres fichiers du projet (server node)
module.exports = app;
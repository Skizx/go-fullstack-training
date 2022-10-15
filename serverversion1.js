// Ici j'importe le package HTTP natif de node
const http = require('http');

// J'importe l'application exporter
const app = require('./app')

// J'indique à l'application express sur quel port elle tournera
app.set('port', process.env.PORT || 3000)

// Je l'utilise pour créer un serveur en passant une fonction qui sera exécutée à chaque appel effectué vers ce serveur
// Cette fonction reçoit les objets request et reponse en tant qu'argument
/*const server = http.createServer((req, res) => {
    // Ici j'utilise la méthode end de la réponse pour renvoyer une réponse de type string en l'appelant
    res.end('Voilà la réponse du serveur !');
});*/

// Ou alors je donnerai l'application importer comme argument pour mon serveur
const server = http.createServer(app);


// Je configure le serveur pour qu'il écoute :
// Soit la variable d'environnement du port (Si la plateforme de déploiement propose un port par défaut, c est celui-ci qu'on écoutera).
// Soit le port 3000
server.listen(process.env.PORT || 3000);


const Things = require('../models/Things')
const fs = require('fs');

exports.createThing = (req, res, next) => {
    const thingObjet = JSON.parse(req.body.thing);
    delete thingObjet._id;
    delete thingObjet._userId;
    const thing = new Things ({
        ...thingObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    })
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error}));
};

exports.modifyThing = (req, res, next) => {
    const thingObjet = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    } : { ...req.body};

    delete thingObjet._userId;
    Things.findOne({ _id: req.params.id})
    .then((thing) => {
        if (thing.userId != req.auth.userId) {
            res.status(401).json({ message: 'Non autorisé !'})
        } else {
            Things.updateOne({ _id: req.params.id}, { ...thingObjet, _id: req.params.id})
            .then(() => res.status(200).json ({ message : 'Objet modifié !'}))
            .catch(error => res.status(401).json ({ error }));
        }})

    .catch(error => res.status(400).json ({ error }));
};

exports.deleteThing = (req, res, next) => {
    Things.findOne({ _id: req.params.id})
    .then((thing) => {
        if (thing.userId != req.auth.userId) {
            res.status(401).json({ message: 'Non autorisé !'})
        } else {
            const filename = thing.imageUrl.split('/image/')[1];
            fs.unlink(`image/${filename}`, () => {
                Things.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => res.status(500).json ({ error}));
};

exports.getOneThing = (req, res, next) => {
    Things.findOne({ _id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error}));
};

exports.getAllThings = (req, res, next) => {
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
 };
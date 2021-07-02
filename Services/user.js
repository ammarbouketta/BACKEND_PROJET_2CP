const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user').User_db;
const ecrire = require('../Models/user').ecrire;
const { ajouter } = require('./historique');


exports.signup = (req, res, next) => {
    if (User({ "email": req.body.email }).get().length === 0) {
        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const user = User.insert({
                    "nom": req.body.nom,
                    "prenom": req.body.prenom,
                    "email": req.body.email,
                    "password": hash,
                    "type_profil": req.body.type_profil,
                    "photo_de_profil": req.body.photo_de_profil || ""
                });
                ecrire(process.env.User_file, User().get());
                const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
                const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
                const email = decodedToken.email;
                var donnee="Création d'un compte par l'admin";
                ajouter(email,donnee);
                res.status(201).json({ message: 'Utilisateur créé !' });
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        console.log(User().get());
        res.json({
            "Error": "User already exists "
        });
    }
}
exports.lister = (req, res, next) => {
    console.log(req.headers.authorization);
    
    const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const email = decodedToken.email;
    var donnee="Affichage des utilisateurs";
    ajouter(email,donnee);
    res.json(User().get());
    next();
};
exports.update_mot_de_passe = (req, res, next) => {
    if (User({ "email": req.body.email }).get().length === 1) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = User({ "email": req.body.email }).update({
                    "password": hash||User({ "email": req.body.email }).select("password")[0],
                });
                ecrire(process.env.User_file, User().get());
                var email1="test3@esi.dz";
                var donnee="Modification de mot de passe d'un compte .";
                ajouter(email1,donnee);
                res.status(200).json({ message: 'Infos modifiées !' });
                next();
            })
            .catch(error => {
                res.status(400).json({ error });
                next();
            });
    } else {
        res.json({
            "Error": "User n'existe pas "
        });
        next();
    }
};

exports.update_info = (req, res, next) => {
    if (User({ "email": req.body.email }).get().length === 1) {
      
                const user = User({ "email": req.body.email }).update({
                    "nom": req.body.nom||User({ "email": req.body.email }).select("nom")[0],
                    "prenom": req.body.prenom||User({ "email": req.body.email }).select("prenom")[0],
                    "type_profil":User({ "email": req.body.email }).select("type_profil")[0],
                    "photo_de_profil": req.body.photo_de_profil||User({ "email": req.body.email }).select("photo_de_profil")[0],
                });
                ecrire(process.env.User_file, User().get());
                const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
                const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
                const email = decodedToken.email;
                var donnee="Modification des informations d'un compte .";
                ajouter(email,donnee);
                res.status(200).json({ message: 'Infos modifiées !' });       
    } else {
        res.status(500).json({
            "Error": "User n'existe pas "
        });
        next();
    }
};


exports.login = (req, res, next) => {
    if (User({ "email": req.body.email }).get().length === 1) {
        bcrypt.compare(req.body.password, User({ "email": req.body.email }).select('password')[0]).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            'Error': 'Mot de passe incorrect!'
                        });
                    }
                    //mot de passe correcte, on genere donc notre token a base de profil de l'utilisateur
                    var email1=req.body.email;
                    var donnee="L'utilisateur connecté(e).";
                    ajouter(email1,donnee);
                    res.status(200).json({
                        profil: User({ "email": req.body.email }).select('type_profil')[0],
                        token: jwt.sign({ profil: User({ "email": req.body.email }).select('type_profil')[0],
                    email : req.body.email },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                  
                })
            .catch(err => {
                res.status(500).json({
                    "Error": err
                });  
                   
                next();
            });
    } else {
        res.status(400).json({
            "Error": "User n'existe pas "
        });
        next();
    }
};

exports.delete_user = (req, res, next) => {
    if (User({ "email": req.body.email }).get().length === 1) {
        try {
            //verifier si c un admin 
            const user = User({ "email": req.body.email }).remove();
            ecrire(process.env.User_file, User().get());
            const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
            const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
            const email = decodedToken.email;
            var donnee="Suppression d'une compte.";
            ajouter(email,donnee);
            res.status(200).json({ message: 'user supprimé !' })
        } catch (error) { res.status(400).json({ error }) };
    } else {
        res.json({
            "Error": "User n'existe pas "
        });
    }
    next();
};
exports.infos_user = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const email = decodedToken.email;
    if (User({ "email": email }).get().length === 1) {
        try {
            const user = User({ "email": email }).get()[0];
            res.status(200).json({
                "nom" : user.nom,
                "prenom" : user.prenom,
                "email": user.email,
                "type_profil": user.type_profil,
                //"photo_de_profil": user.photo_de_profil
            });
            var donnee="Affichage des informations d'un compte .";
            ajouter(email,donnee); 
        } catch (error) { res.status(400).json({ error }); }
    } else {
        res.json({
            "Error": "User n'existe pas "
        });
    }
    next();
};

exports.infos_user2 = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const email = decodedToken.email;

    if (User({ "email": req.query.email }).get().length === 1) {
        try {
            const user = User({ "email": req.query.email }).get()[0];
            res.status(200).json({
                "nom" : user.nom,
                "prenom" : user.prenom,
                "email": user.email,
                "type_profil": user.type_profil,
                //"photo_de_profil": user.photo_de_profil
            });
            var donnee="Affichage des informations d'un compte .";
            ajouter(email,donnee); 
        } catch (error) { res.status(400).json({ error }); }
    } else {
        res.json({
            "Error": "User n'existe pas "
        });
    }
    next();
};
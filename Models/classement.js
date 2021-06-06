const TAFFY = require('taffy');
const fs = require("fs");
const dotEnv = require("dotenv");
const { ecrire } = require('./user');

const Classement_db = TAFFY();


var obj;
fs.readFile(process.env.classement_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    Classement_db.insert(JSON.stringify(obj), null, 4);
});

exports.ecrire = () => {
    fs.writeFile(process.env.classement_file, JSON.stringify(Classement_db().get(), null, 4), (err) => {
        if (err) throw err;
    })
};
module.exports.Classement_db = Classement_db;
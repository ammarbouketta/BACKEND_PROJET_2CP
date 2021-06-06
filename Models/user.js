const TAFFY = require('taffy');
const fs = require("fs");
const dotEnv = require("dotenv");

const User_db = TAFFY();


var obj;
fs.readFile(process.env.User_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    User_db.insert(JSON.stringify(obj), null, 4);
});

/*User_db.settings({
    onUpdate: () => {
        fs.writeFile(process.env.User_file, JSON.stringify(User_db().get(), null, 4), (err) => {
            if (err) throw err;
        })
        console.log("Ecriture faite avec succes");
    },
    onRemove: () => {
        fs.writeFile(process.env.User_file, JSON.stringify(User_db().get(), null, 4), (err) => { if (err) throw err; })
        console.log("Ecriture faite avec succes");
    },
    onInsert: () => {
        console.log("Ecriture faite avec succes, " + JSON.stringify(User_db().get(), null, 4));
        fs.writeFile(process.env.User_file, JSON.stringify(User_db().get(), null, 4), (err) => { if (err) throw err; })
    }
});*/
exports.ecrire = (path, data) => {
    fs.writeFile(path, JSON.stringify(data, null, 4), (err) => {
        if (err) throw err;
    })
}
module.exports.User_db = User_db;
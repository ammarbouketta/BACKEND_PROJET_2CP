const TAFFY = require('taffy');
const fs = require("fs");
const Recours_db = TAFFY();

var obj;
fs.readFile(process.env.Recours_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    Recours_db.insert(JSON.stringify(obj), null, 4);
});

exports.ecrire=()=>{
    fs.writeFile(process.env.Recours_file, JSON.stringify(Recours_db().get(), null, 4), (err) => { if (err) throw err; })
}
module.exports.Recours_db = Recours_db;
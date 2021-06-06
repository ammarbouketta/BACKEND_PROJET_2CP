/* jslint es6 */
const TAFFY = require('taffy');
const fs = require("fs");
const dotEnv = require("dotenv");

const Documents_ad_db = TAFFY();


var obj;
fs.readFile(process.env.Documents_ad_file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log("lecture faite avec succes");
    Documents_ad_db.insert(JSON.stringify(obj), null, 4);
});

exports.ecrire = () => {
    fs.writeFile(process.env.Documents_ad_file, JSON.stringify(Documents_ad_db.get(), null, 4), (err) => {
        if (err) throw err;
    })
}
module.exports.Documents_ad_db = Documents_ad_db;
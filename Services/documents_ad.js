var fs = require('fs');
var path = require('path');
const multer = require('multer');
const Documents_ad = require('../Models/documents_ad').Documents_ad_db;
const ecrire = require('../Models/documents_ad').ecrire;
//to upload a file locally


// exports.upload = (req, res, next) => {
//     const storage = multer.diskStorage({
//         destination: '../uploads',
//         filename: function(req, file, cb){
//             const {originalname} = file;
//             cb(null, originalname); 
//         }
//     })

//     const upload = multer({
//         storage : storage
//     }).single('doc_ad')

// //     const intitule = originalname;
// //     let date_ob = new Date();
// // let date = ("0" + date_ob.getDate()).slice(-2);
// // // current month
// // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// // // current year
// // let year = date_ob.getFullYear();
// // // current hours
// // let hours = date_ob.getHours();
// // // current minutes
// // let minutes = date_ob.getMinutes();
// // // current seconds
// // let seconds = date_ob.getSeconds();
// // const date_heure =date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;  
// //     const documents_ad = Documents_ad.insert({
// //         "intitule": intitule,
// //         "date_heure": date_heure,

// //     });
// //     ecrire(process.env.Documents_ad_file, Documents_ad().get());
// //     //en front, on ecrit doc_ad dans nom de input file

    
    

// }

exports.upload = (req, res, next) => {
    res.json({file: req.file})
}

exports.list_doc = (req, res, next) => {
    const obj = {}
    fs.readdir('./uploads', (err,files) => {
        if (err) console.log(err); else {
                //var Files = JSON.stringify(Object.assign({}, files));
                //console.log(files)
                res.json(files)
              }

        })
        

   

}

exports.click_file = (req, res, next) => {
    console.log(req.query.file)

    var file = req.query.file;
    const path = './uploads/' + file
    console.log(path)

        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res)
    
    
//     var data =fs.readFileSync('./uploads/' + file);
//     //res.contentType("application/pdf");
//     res.setHeader('Content-Type', 'application/pdf')
// res.setHeader('Content-Disposition', 'inline;filename=yolo.pdf')
//     res.sendfile('./uploads/' + file);
}
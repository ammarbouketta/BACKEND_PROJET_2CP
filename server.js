const app = require("express")();
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
dotEnv.config();
const fs = require('fs');
const path = require('path');
const cors = require ('cors');
app.use(cors());
//const {PDFNet}=require("@pdftron/pdfnet-node")



 //telecharger directement le pdf  
// app.get('/download', (req, res)=>{

//   var file = fs.createReadStream('./pdf-form/C.pdf');
// var stat = fs.statSync('./pdf-form/C.pdf');
// res.setHeader('Content-Length', stat.size);
// res.setHeader('Content-Type', 'application/pdf');
// res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
// file.pipe(res);
// })
// afficher le pdf sur le browser et puis tu pourrra telecharger ou imprimer
//  app.get('/download1', (req, res)=>{
//    var data =fs.readFileSync('./pdf-form/ACNEW.pdf');
//    res.contentType("application/pdf");
//    res.send(data);
  
  
//  })


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.listen(process.env.PORT, () => console.log("Connected to Server on localhost " + process.env.PORT));
app.get("/", (req, res) => {
    res.send("Server is up");
});
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);
const demandeurRoutes = require('./routes/demandeur');
app.use('/demandeur', demandeurRoutes);

const historiqueRoutes = require('./routes/historique');
app.use('/historique', historiqueRoutes );

const compagneRoutes = require('./routes/compagne');
app.use('/compagne', compagneRoutes );

const recoursRoutes = require('./routes/recours');
app.use('/recours', recoursRoutes);

// const documentRoutes = require('./routes/documents_ad');
// app.use('/doc', documentRoutes);



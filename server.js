const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
var fs = require('fs');

dotEnv.config();

app.use("./uploads", express.static("uploads"));
const cors = require ('cors');
app.use(cors());

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

const critereRoutes = require('./routes/critere');
app.use('/critere', critereRoutes);

const statistiqueRoutes = require('./routes/statistique');
app.use('/statistique', statistiqueRoutes );

const historiqueRoutes = require('./routes/historique');
app.use('/historique', historiqueRoutes );

const compagneRoutes = require('./routes/compagne');
app.use('/compagne', compagneRoutes );

const recoursRoutes = require('./routes/recours');
app.use('/recours', recoursRoutes);

const documentRoutes = require('./routes/documents_ad');
app.use('/doc', documentRoutes);

/*
app.get('/convertFromOffice',(req,res)=>{
    const converttopdf =async()=>{
        const pdfdoc=await PDFNet.PDFDoc.create();
        await pdfdoc.initSecurityHandler();
        await PDFNet.Convert.toPdf(pdfdoc,'./pdf-form/ACNEW.docx');
        pdfdoc.save('./pdf-form/aze.pdf',PDFNet.SDFDoc.SaveOptions.e_linearized);
    
    }
    PDFNet.runWithCleanup(converttopdf).then(()=>{
    fs.readFile('./pdf-form/aze.pdf',(err,data)=>{
        if(err){
            res.statusCode=500;
            res.end(err);
        }else{
            res.setHeader('ContentType','application/pdf');
            res.end(data);

        };
    });
    }).catch(err=>{
        res.statusCode=500;
        res.end();
    });
});*/


const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
dotEnv.config();


app.use( express.static("C:/backend-projet-2CP/uploads"));
app.use( express.static("C:/backend-projet-2CP/pdf-form"));
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

/*app.get('/convertFromOffice',(req,res)=>{
    const {filename} =req.query;
    const input = path.resolve(__dirname,'./pdf-form/ACNEW.docx');
    const output = path.resolve(__dirname,'./pdf-form/aze.pdf');
    const converttopdf =async()=>{
        const pdfdoc=await PDFNet.PDFDoc.create();
        await pdfdoc.initSecurityHandler();
        await PDFNet.Convert.toPdf(pdfdoc,input);
        pdfdoc.save(output,PDFNet.SDFDoc.SaveOptions.e_linearized);
    
    }
    PDFNet.runWithCleanup(converttopdf).then(()=>{
    fs.readFile(output,(err,data)=>{
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

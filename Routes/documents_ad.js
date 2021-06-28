const express = require('express');
const router = express.Router();
const docCtrl = require('../Services/documents_ad');
const multer = require('multer')


const storage = multer.diskStorage({
             destination: './uploads',
             filename: function(req, file, cb){
                 const {originalname} = file;
                 cb(null, originalname); 
             }
         })

const upload = multer(
    {
        storage : storage,
    }
)
router.get('/list_file', docCtrl.list_doc);
router.post('/file',upload.single('file'), docCtrl.upload);
router.get('/send_file', docCtrl.click_file);



module.exports = router;

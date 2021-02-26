const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');
const xlsx = require('xlsx');

const uploadExcel = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            let uploadPath = path.join(__dirname, '..', 'uploads');
            cb(null, uploadPath);
        },
        filename: function(req, file, cb){
            let servFileName = "excel-data.xlsx";
            cb(null, servFileName);
        }
    }),
    fileFilter: function(req, file, cb){
        let regex = new RegExp(/.(?=xlsx|xls|xlsx.zip|xls.zip)/);
        if(regex.exec(file.originalname)){
            console.log("Exito! Excel encontrado.")
            cb(null, true);
        }
        else{
            cb("No es un archivo de Excel.", false);
        }
    },
    limits: {
        fileSize: 500000,
    }
});

/********** CARGA DE HOJA DE DATOS **********/
router.post('/excel-data', uploadExcel.single('file'), (req, res)=>{
    console.log(req.file);
    console.log(req.file.path);

    res.json({
        file: req.file
    });
});

router.get('/excel-data', (req, res)=>{
    let excelFile = xlsx.readFile(path.join(__dirname, '..', 'uploads', 'excel-data.xlsx'), {
        cellDates: true,
    });
    let excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];

    let data = xlsx.utils.sheet_to_json(excelSheet);
    
    res.json(data);
})

module.exports = router;
const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');
const readXlsxFile = require("read-excel-file/node");

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
    }
});

/********** CARGA DE HOJA DE DATOS **********/
router.post('/excel-data', uploadExcel.single('excel-data'), (req, res)=>{
    if(req.file == undefined){
        return res.status(400).json(
            {
                status: "ERROR: Solo se admiten archivos de datos de excel"
            }
        );
    }
    else{
        console.log(req.file);
        console.log(req.file.path);

        let productos_cargados = [];

        res.json({
            status: "Datos cargados",
            data: productos_cargados
        });
    }
});

module.exports = router;
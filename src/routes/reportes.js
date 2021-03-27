const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('reportes.ejs', {pageTitle: "Reportes"});
});

router.get('/productos', (req,res)=>{
    res.render('reporte-productos.ejs', {pageTitle: "Reporte de Productos"});
});

module.exports = router;
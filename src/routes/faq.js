const express = require('express');
const router = express.Router();

router.get('/importar', (req,res)=>{
    res.render('howto-importar.ejs', {pageTitle: "Cómo importar desde una hoja de datos"});
});

module.exports = router;
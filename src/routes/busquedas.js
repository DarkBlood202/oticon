const express = require('express');
const router = express.Router();


const Producto = require('../models/Producto');


/** PRODUCTOS **/
router.get('/producto/:q', async(req, res)=>{
    const productos = await Producto.find({
        nombre: {
            "$regex": req.params.q,
            "$options": "i",
        }
    }).sort({
        nombre: 'asc',
    });
    res.json(productos);
});


module.exports = router;
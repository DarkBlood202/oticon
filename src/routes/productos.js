const express = require('express');
const router = express.Router();

const Producto = require('../models/Producto');

router.get('/', async(req, res)=>{
    const productos = await Producto.find();
    res.json(productos);
    console.log(productos);
});

router.post('/', async(req, res)=>{
    const producto = new Producto(req.body);
    await producto.save();
    res.json({
        status: "Producto registrado (algo asi...)"
    });
});

router.put('/:id', async(req, res)=>{
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Producto modificado"
    });
});

router.delete('/:id', async(req, res)=>{
    await Producto.findByIdAndDelete(req.params.id);
    res.json({
        status: "Producto eliminado"
    });
});

module.exports = router;
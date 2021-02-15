const express = require('express');
const router = express.Router();

const Producto = require('../models/Producto');
const Categoria = require();

router.get('/productos', async(req, res)=>{
    const productos = await Producto.find();
    res.json(productos);
    // console.log(productos);
});

router.post('/productos/nuevo', async(req, res)=>{
    const producto = new Producto(req.body);
    await producto.save();
    res.json({
        status: "Producto registrado"
    });
});

router.get('/producto/:id', async(req, res)=>{
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
});

router.put('/producto/:id', async(req, res)=>{
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Producto modificado"
    });
});

router.delete('/producto/:id', async(req, res)=>{
    await Producto.findByIdAndDelete(req.params.id);
    res.json({
        status: "Producto eliminado"
    });
});

module.exports = router;
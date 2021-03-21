const express = require('express');
const router = express.Router();


const Producto = require('../models/Producto');
const Marca = require('../models/Marca');
const Proveedor = require('../models/Proveedor');
const Seccion = require('../models/Seccion');
const Categoria = require('../models/Categoria');
const MedidaVenta = require('../models/MedidaVenta');


/** PRODUCTOS **/
router.get('/producto/:q', async(req, res)=>{
    const productos = await Producto.find({
        $or: [
            {
                nombre: {
                    "$regex": req.params.q,
                    "$options": "i",
                }
            },
            {
                codigoBarras: {
                    "$regex": req.params.q,
                    "$options": "i",
                }
            },
        ]
    });
    res.json(productos);
});

/** MARCAS **/
router.get('/marca/:q', async(req, res)=>{
    const marcas = await Marca.find({
        $or: [
            {
                nombre: {
                    "$regex": req.params.q,
                    "$options": "i",
                }
            },
        ]
    })
    
    res.json(marcas);
});

router.get('/marca-e/:q', async(req, res)=>{
    const marcas = await Marca.find({
        nombre: req.params.q,
    });
    res.json(marcas);
});

/** PROVEEDORES **/
router.get('/proveedor/:q', async(req, res)=>{
    const proveedores = await Proveedor.find({
        $or: [
            {
                nombre: {
                    "$regex": req.params.q,
                    "$options": "i",
                }
            },
        ]
    })
    
    res.json(proveedores);
});

router.get('/proveedor-e/:q', async(req, res)=>{
    const proveedores = await Proveedor.find({
        nombre: req.params.q,
    });
    res.json(proveedores);
});

/** SECCIONES **/
router.get('/seccion/:q', async(req, res)=>{
    const secciones = await Seccion.find({
        $or: [
            {
                nombre: {
                    "$regex": req.params.q,
                    "$options": "i",
                }
            },
        ]
    })
    
    res.json(secciones);
});

router.get('/seccion-e/:q', async(req, res)=>{
    const secciones = await Seccion.find({
        nombre: req.params.q,
    });
    res.json(secciones);
});

/** CATEGORÍAS **/
router.get('/categoria/:q', async(req, res)=>{
    const categorias = await Categoria.find({
        $or: [
            {
                nombre: {
                    "$regex": req.params.q,
                    "$options": "i",
                }
            },
        ]
    })
    
    res.json(categorias);
});

router.get('/categoria-e/:q', async(req, res)=>{
    const categorias = await Categoria.find({
        nombre: req.params.q,
    });
    res.json(categorias);
});

/** MEDIDAS DE VENTA **/
router.get('/medidas-venta/:q', async(req, res)=>{
    const medidasVenta = await MedidaVenta.find({
        $or: [
            {
                nombre: {
                    "$regex": req.params.q,
                    "$options": "i",
                }
            },
            {
                abreviacion: {
                    "$regex": req.params.q,
                    "$options": "i",
                }
            },
        ]
    })
    
    res.json(medidasVenta);
});


module.exports = router;
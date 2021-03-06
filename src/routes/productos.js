const express = require('express');
const router = express.Router();


const Producto = require('../models/Producto');
const Marca = require('../models/Marca');
const Proovedor = require('../models/Proveedor');
const Categoria = require('../models/Categoria');
const Seccion = require('../models/Seccion');
const MedidaVenta = require('../models/MedidaVenta');
const Proveedor = require('../models/Proveedor');


/********** PRODUCTOS **********/
router.get('/productos', async(req, res)=>{
    const productos = await Producto.find({},null,{
        sort: {
            idProducto: 'asc'
        }
    });
    res.json(productos);
});

router.post('/productos', async(req, res)=>{
    const producto = new Producto(req.body);
    await producto.save();
    res.json({
        status: "Producto registrado"
    });
});

router.get('/productos/:id', async(req, res)=>{
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
});

router.put('/productos/:id', async(req, res)=>{
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Producto modificado"
    });
});

router.delete('/productos/:id', async(req, res)=>{
    await Producto.findByIdAndDelete(req.params.id);
    res.json({
        status: "Producto eliminado"
    });
});

/********** MARCA **********/
router.get('/marcas', async(req, res)=>{
    const marcas = await Marca.find();
    res.json(marcas);
});

router.post('/marcas', async(req, res)=>{
    const marca = new Marca(req.body);
    try {
        await marca.save();
        res.json({
            status: "Marca registrada"
        });
    }
    catch (err) {
        res.json({
            status: "Marca no registrada",
            error: err,
        });
    }
    
})

router.get('/marcas/:codigo', async(req, res)=>{
    const marca = await Marca.find(req.params);
    res.json(marca);
});

router.put('/marcas/:codigo', async(req, res)=>{
    await Marca.findOneAndUpdate(req.params, req.body);
    res.json({
        status: "Marca modificada"
    });
});

router.delete('/marcas/:codigo', async(req, res)=>{
    await Marca.findOneAndDelete(req.params);
    res.json({
        status: "Marca eliminada"
    });
});

/********** PROVEEDORES **********/
router.get('/proveedores', async(req, res)=>{
    const proveedores = await Proveedor.find();
    res.json(proveedores);
});

router.post('/proveedores', async(req, res)=>{
    const proveedor = new Proveedor(req.body);
    try {
        await proveedor.save();
        res.json({
            status: "Proveedor registrada"
        });
    }
    catch (err) {
        res.json({
            status: "Proveedor no registrado",
            error: err,
        });
    }
    
})

router.get('/proveedores/:codigo', async(req, res)=>{
    const proveedor = await Proveedor.find(req.params);
    res.json(proveedor);
});

router.put('/proveedores/:codigo', async(req, res)=>{
    await Proveedor.findOneAndUpdate(req.params, req.body);
    res.json({
        status: "Proveedor modificado",
    });
});

router.delete('/proveedores/:codigo', async(req, res)=>{
    await Proveedor.findOneAndDelete(req.params);
    res.json({
        status: "Proveedor eliminado"
    });
});

/********** CATEGORIAS **********/
router.get('/categorias', async(req, res)=>{
    const categorias = await Categoria.find();
    res.json(categorias);
});

router.post('/categorias', async(req, res)=>{
    const categoria = new Categoria(req.body);
    try {
        await categoria.save();
        res.json({
            status: "Categoría creada"
        });
    }
    catch (err) {
        res.json({
            status: "Categoría no se pudo crear",
            error: err
        });
    }
    
})

router.get('/categorias/:codigo', async(req, res)=>{
    const categoria = await Categoria.find(req.params);
    res.json(categoria);
});

router.put('/categorias/:codigo', async(req, res)=>{
    await Categoria.findOneAndUpdate(req.params, req.body);
    res.json({
        status: "Categoria modificada"
    });
});

router.delete('/categorias/:codigo', async(req, res)=>{
    await Categoria.findOneAndDelete(req.params);
    res.json({
        status: "Categoria eliminada"
    });
});


/********** SECCIONES **********/
router.get('/secciones', async(req, res)=>{
    const secciones = await Seccion.find();
    res.json(secciones);
});

router.post('/secciones', async(req, res)=>{
    const seccion = new Seccion(req.body);
    try {
        await seccion.save();
        res.json({
            status: "Sección creada"
        });
    }
    catch (err) {
        res.json({
            status: "Sección no se pudo crear",
            error: err
        });
    }
    
})

router.get('/secciones/:codigo', async(req, res)=>{
    const seccion = await Seccion.find(req.params);
    res.json(seccion);
});

router.put('/secciones/:codigo', async(req, res)=>{
    await Seccion.findOneAndUpdate(req.params, req.body);
    res.json({
        status: "Sección modificada"
    });
});

router.delete('/secciones/:codigo', async(req, res)=>{
    await Seccion.findOneAndDelete(req.params);
    res.json({
        status: "Sección eliminada"
    });
});


/********** MEDIDAS DE VENTA **********/
router.get('/medidas-venta', async(req, res)=>{
    const medidasVenta = await MedidaVenta.find();
    res.json(medidasVenta);
});

router.post('/medidas-venta', async(req, res)=>{
    const medidaVenta = new MedidaVenta(req.body);
    try {
        await medidaVenta.save();
        res.json({
            status: "Medida de venta registrada"
        });
    }
    catch (err) {
        res.json({
            status: "Medida de venta no se pudo registrar",
            error: err
        });
    }
    
})

router.get('/medidas-venta/:id', async(req, res)=>{
    const medidaVenta = await MedidaVenta.findById(req.params.id);
    res.json(medidaVenta);
});

router.put('/medidas-venta/:id', async(req, res)=>{
    await MedidaVenta.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Medida de venta modificada"
    });
});

router.delete('/medidas-venta/:id', async(req, res)=>{
    await MedidaVenta.findByIdAndDelete(req.params.id);
    res.json({
        status: "Medida de venta eliminada"
    });
});

module.exports = router;
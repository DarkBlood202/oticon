const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('base.ejs', {pageTitle: "Bienvenido a Oticon"});
});

router.get('/ingresar', (req, res)=>{
    res.render('base.ejs', {pageTitle: "Ingreso"});
});

router.get('/productos', (req, res)=>{
    res.render('productos.ejs', {pageTitle: "Vista de productos"});
});

router.get('/productos/registrar', (req, res)=>{
    res.render('registro.ejs', {pageTitle: "Registrar productos"});
});

router.get('/productos/campos', (req, res)=>{
    res.render('modificacion-campos.ejs', {pageTitle: "Modificar campos de producto"});
})

router.get('/productos/registrar/nuevo', (req, res)=>{
    res.render('registro-nuevo.ejs', {pageTitle: "Registrar nuevo producto"});
});

router.get('/productos/marcas', (req, res)=>{
    res.render('marcas.ejs', {pageTitle: "Registrar nueva marca"});
});

router.get('/productos/proveedores', (req, res)=>{
    res.render('proveedores.ejs', {pageTitle: "Registrar nuevo proveedor"});
});

router.get('/productos/secciones', (req, res)=>{
    res.render('secciones.ejs', {pageTitle: "Registrar nueva sección"});
});

router.get('/productos/categorias', (req, res)=>{
    res.render('categorias.ejs', {pageTitle: "Registrar nueva categoría"});
});

router.get('/productos/medidas-venta', (req, res)=>{
    res.render('medidas-venta.ejs', {pageTitle: "Registrar nueva medida de venta"});
});

router.get('/productos/registrar/importar', (req, res)=>{
    res.render('registro-importar.ejs', {pageTitle: "Importar productos"});
});

module.exports = router;
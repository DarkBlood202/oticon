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

router.get('/productos/registrar/nuevo', (req, res)=>{
    res.render('registro-nuevo.ejs', {pageTitle: "Registrar nuevo producto"});
});

router.get('/productos/registrar/importar', (req, res)=>{
    res.render('registro-importar.ejs', {pageTitle: "Importar productos"});
});

module.exports = router;
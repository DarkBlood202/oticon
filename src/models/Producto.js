const mongoose = require('mongoose');
const { Schema } = mongoose;

const Producto = new Schema({
    nombre: String,
    descripcion: String,
    marca: String,
    proveedor: String,
    fecha_caducidad: Date,
    precio_costo: Number,
    precio_venta: Number,
    precio_mayorista: Number,
    seccion: {
        nombre: String,
        codigo: String
    },
    categoria: {
        nombre: String,
        codigo: String
    },
    id: String,
    codigo_barras: String
});

module.exports = mongoose.model('Producto', Producto);
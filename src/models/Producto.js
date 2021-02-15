const mongoose = require('mongoose');
const { Schema } = mongoose;

const Producto = new Schema({
    nombre: String,
    descripcion: String,
    cantidad: Number,
    fechaCaducidad: Date,
    marca: String,
    proveedor: String,
    precioCosto: Number,
    precioVenta: Number,
    precioMayorista: Number,
    cantidadMayorista: Number,

    codigoSeccion: String,
    codigoCategoria: String,
    idMedidaVenta: String,

    // seccion: {
    //     nombre: String,
    //     codigo: String,
    // },
    // categoria: {
    //     nombre: String,
    //     codigo: String,
    // },
    // medida_venta: {
    //     nombre: String,
    //     abreviacion: String,
    // },

    id: String,
    codigoBarras: String
}, {
    collection: 'productos'
});

module.exports = mongoose.model('Producto', Producto);
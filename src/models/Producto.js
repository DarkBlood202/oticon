const mongoose = require('mongoose');
const { Schema } = mongoose;

const Producto = new Schema({
    nombre: String,
    descripcion: String,
    cantidad: Number,
    fechaCaducidad: Date,

    codigoMarca: String,
    codigoProveedor: String,

    precioCompra: Number,
    precioVenta: Number,
    precioMayorista: Number,
    cantidadMayorista: Number,

    codigoSeccion: String,
    codigoCategoria: String,
    idMedidaVenta: String,

    cantidadEquivalente: Number,
    idMedidaAsociada: String,

    codigoBarras: {
        type: String,
        unique: true,
        sparse: true,
    },

    idProducto: {
        type: String,
        unique: true,
    },

}, {
    collection: 'productos'
});

module.exports = mongoose.model('Producto', Producto);
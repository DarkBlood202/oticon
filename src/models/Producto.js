const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
        type: Number,
        unique: true,
    },

    codigoAntiguo: String,

}, {
    collection: 'productos'
});

Producto.plugin(AutoIncrement, {id: 'contador_id_producto', inc_field: 'idProducto'});

module.exports = mongoose.model('Producto', Producto);
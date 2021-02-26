const mongoose = require('mongoose');
const { Schema } = mongoose;

const Producto = new Schema({
    nombre: String,
    descripcion: String,
    cantidad: Number,
    fechaCaducidad: Date,
    marca: String,
    proveedor: String,
    precioCompra: Number,
    precioVenta: Number,
    precioMayorista: Number,
    cantidadMayorista: Number,

    codigoSeccion: String,
    codigoCategoria: String,
    idMedidaVenta: String,

    
    cantidadEquivalente: Number,
    idMedidaAsociada: String,

    codigoBarras: String,

    // id: {
    //     type: String,
    //     index: true,
    //     unique: true,
    // },
}, {
    collection: 'productos'
});

module.exports = mongoose.model('Producto', Producto);
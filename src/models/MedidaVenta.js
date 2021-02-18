const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedidaVenta = new Schema({
    nombre: String,
    abreviacion: String,
}, {
    collection: 'medida_ventas',
});

module.exports = mongoose.model('MedidaVenta', MedidaVenta);
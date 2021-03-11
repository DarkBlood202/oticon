const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const Proveedor = new Schema({
    codigo: {
        type: Number,
        index: true,
        unique: true,
    },
    nombre: String,
}, {
    collection: 'proveedores',
});

Proveedor.plugin(AutoIncrement, {id: 'contador_codigo_proveedor', inc_field: 'codigo'});

module.exports = mongoose.model('Proveedor', Proveedor);
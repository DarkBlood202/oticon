const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const Marca = new Schema({
    codigo: {
        type: Number,
        index: true,
        unique: true,
    },
    nombre: String,
}, {
    collection: 'marcas',
});

Marca.plugin(AutoIncrement, {id: 'contador_codigo_marca', inc_field: 'codigo'});

module.exports = mongoose.model('Marca', Marca);
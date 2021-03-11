const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const Categoria = new Schema({
    codigo: {
        type: Number,
        index: true,
        unique: true,
    },
    nombre: String,
}, {
    collection: 'categorias',
});

Categoria.plugin(AutoIncrement, {id: 'contador_codigo_categoria', inc_field: 'codigo'});

module.exports = mongoose.model('Categoria', Categoria);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Categoria = new Schema({
    codigo: {
        type: String,
        index: true,
        unique: true,
    },
    nombre: String,
}, {
    collection: 'categorias',
});

module.exports = mongoose.model('Categoria', Categoria);
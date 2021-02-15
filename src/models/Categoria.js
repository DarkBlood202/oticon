const mongoose = require('mongoose');
const { Schema } = mongoose;

const Categoria = new Schema({
    codigo: String,
    nombre: String,
}, {
    collection: 'categorias'
});

module.exports = mongoose.model('Categoria', Categoria);
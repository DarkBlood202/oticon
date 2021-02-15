const mongoose = require('mongoose');
const { Schema } = mongoose;

const Seccion = new Schema({
    codigo: String,
    nombre: String,
}, {
    collection: 'secciones'
});

module.exports = mongoose.model('Seccion', Seccion);
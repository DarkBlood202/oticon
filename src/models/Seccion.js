const mongoose = require('mongoose');
const { Schema } = mongoose;

const Seccion = new Schema({
    codigo: {
        type: String,
        index: true,
        unique: true,
    },
    nombre: String,
}, {
    collection: 'secciones'
});

module.exports = mongoose.model('Seccion', Seccion);
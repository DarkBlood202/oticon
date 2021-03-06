const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const Seccion = new Schema({
    codigo: {
        type: Number,
        index: true,
        unique: true,
    },
    nombre: String,
}, {
    collection: 'secciones',
});

Seccion.plugin(AutoIncrement, {id: 'contador_codigo_seccion', inc_field: 'codigo'});

module.exports = mongoose.model('Seccion', Seccion);
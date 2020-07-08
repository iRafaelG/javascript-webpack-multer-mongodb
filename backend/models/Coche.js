// import node modules
const { Schema, model } = require('mongoose');

// coche
const CocheSchema = new Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    matricula: { type: String, required: true },
    foto: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('CocheModel', CocheSchema);
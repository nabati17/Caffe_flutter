const mongoose = require('mongoose');
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId;

const keranjangSchema = new Schema({
    idUser: {
        type: objectId,
    },
    idBarang: {
        type: objectId,
    },
    jumlahBeli: {
        type: Number,
    },
});

module.exports = mongoose.model('keranjang', keranjangSchema)
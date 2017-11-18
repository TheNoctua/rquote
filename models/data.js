const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    quote: {
        type: String
    },
    movie: {
        type: String
    },
    info: {
        type: String
    }
});

const Data = mongoose.model('data', DataSchema);

module.exports = Data;
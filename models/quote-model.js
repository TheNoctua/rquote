const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
        quote: String,
        movie: String,
        info: String
});

const Data = mongoose.model('data', quoteSchema);
module.exports = Data;
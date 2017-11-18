const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/data', {
    useMongoClient: true
  });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.listen(process.env.port || 4000, function(){
    console.log('API is ready!');
});
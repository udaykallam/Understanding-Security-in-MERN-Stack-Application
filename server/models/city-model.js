const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
  });
  

const City = mongoose.model('City', citySchema);

module.exports = City;

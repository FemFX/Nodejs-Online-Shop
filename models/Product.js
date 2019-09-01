const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  title : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  price : {
    type: Number,
    required: true
  },
  date : {
      type : Date,
      default : Date.now
  }
});

module.exports = mongoose.model('Product', productSchema)
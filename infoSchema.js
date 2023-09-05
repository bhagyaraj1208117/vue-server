const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    unique: true,
    required:true
  },
 
 
});

const Image = mongoose.model('info', infoSchema);

module.exports = Image;

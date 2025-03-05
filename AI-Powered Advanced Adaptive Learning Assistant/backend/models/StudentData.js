const mongoose = require('mongoose');

const studentDataSchema = new mongoose.Schema({
    score: { type: Number, required: true },
    attendance: { type: Number, required: true },
    emotionalStatus: { type: String, required: true },
  }, { collection: 'StudentData' });  // Explicit collection name
  
  module.exports = mongoose.model('StudentData', studentDataSchema)
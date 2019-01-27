const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const containerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  container_id: String,
  status: String,
  nickname: String,
  image: String
});

module.exports = mongoose.model('Container', containerSchema);
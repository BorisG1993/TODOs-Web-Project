// user and todo object schemas for mongodb auto search

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema({

  id: {
      type: Number,
      required: true
  },
  todo: {
      type: String,
      required: true
  }
});


const userSchema = new Schema({

  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  todos: {
    type: [TodoSchema],
    default: []
  }

}, {timestamps: true}) 

// automation for finding users collection in the db
const User = mongoose.model('User', userSchema) 
module.exports = User;
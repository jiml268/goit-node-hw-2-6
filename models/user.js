const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
 password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
    avatarURL: String,
})

userSchema.methods.checkPassword  = async function (loginPw) {
  return bcrypt.compare(loginPw, this.password)
}

const Users = model('users', userSchema)
module.exports = Users
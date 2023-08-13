const { Schema, model } = require('mongoos');

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
email: {
    type: String,
    required: true,
  },
phone: {
    type: Number,
    required: true,
  },
  favorie: {
    type: Boolean,
    required: false,
  },
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
})

const Contact = model('contacts', ContactSchema)

module.exports = Contact
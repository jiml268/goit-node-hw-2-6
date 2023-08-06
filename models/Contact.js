const { Schema, model } = require('mongoose');

const ContactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
     favorite: {
        type: Boolean,
        default: false,
    },
    
})

const Contacts = model('contacts', ContactSchema)
module.exports = Contacts
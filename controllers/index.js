const Contacts = require('../models/Contact')

const contactController = {
    async getContacts(req, res) {
        try {
            const data = await Contacts.find();
            res.json(data)
    
        } catch (err) {
            console.log(err)
            res.json(err)
        }

    },
    async createContact(req, res) {
            try {
                const newEmployee = await Contacts.create(req.body);
                res.json(newEmployee)
                
    } catch (err) {
            console.log(err)
            res.json(err)
        }

    },
     async getSingleContacts(req, res) {
        try {
            const data = await Contacts.findOne({ _id: req.params.id });
            res.json(data)
        } catch (err) {
            console.log(err)
            res.json(err)
        }

    },
     async deleteContacts(req, res) {
        try {
            const data = await Contacts.findOneAndDelete({ _id: req.params.id });
            res.json(data)
        } catch (err) {
            console.log(err)
            res.json(err)
        }

    },
      async updateContacts(req, res) {
        try {
            const data = await Contacts.findOneAndUpdate({ _id: req.params.id }, {$set: req.body,}, {new: true,});
            res.json(data)
        } catch (err) {
            console.log(err)
            res.json(err)
        }

    },
       async updateStatusContact(req, res) {
        try {
            const data = await Contacts.findOneAndUpdate({ _id: req.params.id }, {$set: req.body,}, {new: true,});
            res.json(data)
        } catch (err) {
            console.log(err)
            res.json(err)
        }

    },
    
}

module.exports= contactController
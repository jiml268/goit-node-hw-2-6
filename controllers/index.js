const Contacts = require('../models/Contact')
const Users = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Joi = require('joi');


const userschemaJoi = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business')
})

const contactController = {
    async getContacts(req, res, next) {
        try {
            console.log(req.session);
            const data = await Contacts.find();
            res.json(data)
    
        } catch (err) {
            console.log(err)
            res.json(err)
        }

    },
    async createContact(req, res) {
        try {
                const newUser = await Contacts.create(req.body);
                res.json(newUser)
                
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
    
       
    async createUser(req, res, next) {
        const { error, value } =  userschemaJoi.validate(req.body, {abortEarly:false})
        if (error) {
            return res.status(400).json({
                message: "Bad Request",
                data: error
            });
        } else {
            const { password, email, subscription } = value;
            const user = await Users.findOne({ email });
            console.log(`user found is ${user}`)
            if (user) {
                return res.status(409).json({
                    status: 'error',
                    code: 409,
                    message: 'Email is already in use',
                    data: 'Conflict',
                });
            }
            try {

                const hashed = await bcrypt.hash(password, saltRounds)
                const token = jwt.sign({ email }, process.env.JWT_privateKey, { expiresIn: '1h', })
                const newUser = new Users({ password: hashed, email: email, subscription: subscription, token: token });
                await newUser.save();
                req.session.userToken = token;

                res.status(201).json({
                    status: 'success',
                    code: 201,
                    data: {
                        message: 'Registration successful',
                    },
                });
            } catch (error) {
                next(error);
            }
        }
    },

    async userLogin(req, res, next) {
        console.log(req.session);
     const { error, value } =  userschemaJoi.validate(req.body, {abortEarly:false})
  if (error) {
    return res.status(400).json({
        message: "Bad Request",
        data: error
    });
  } else {
      const { password, email } = value;
      const user = await Users.findOne({ email });
      if (!user) {
           return res.status(401).json({
        message: "Email or password is wrong",
    });  
      }
      const validatePw = await user.checkPassword(password)
      if (!validatePw) {
           return res.status(401).json({
        message: "Email or password is wrong",
    });  
      } 
      const token = jwt.sign({ email }, process.env.JWT_privateKey, { expiresIn: '1h', })
      user.token = token;
      await user.save()
      console.log(user)
      req.session.userToken = token;
      req.session.userID = user._id.ObjectId
      console.log(req.session);
       return res.status(200).json({
           message: "OK",
           token: token,
        data: user
    });
        }
    },
    async userLogout(req, res, next) {
        if (req.session.userToken) {
            req.session.destroy(() => {
          console.log(req.session);
        res.json({ message: 'User was signed out' });
      });
    } else {
      res.json({ message: 'You are already signed out' });
    }

    }


    
}

module.exports= contactController
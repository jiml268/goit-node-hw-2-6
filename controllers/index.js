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
            const data = await Contacts.find({ owner: req.session.userID });
            console.log(data)
                        console.log(data.length)
            if (data.length > 0) {
                res.status(201).json({
                    code: "201",
                    message: "Contact List",
                    data: data,
                }
                )
            } else {
res.status(200).json({
                    code: "200",
                    message: "No contacts to display",
                    
                }
                )
            }
           
        } catch (err) {
             res.status(400).json({
               code: '400',
        Massage: "An error has accurred",
      error: err,
    });
           }

    },
    async createContact(req, res, next) {
        try {
            const { name, email, phone, favorie } = req.body;
            const createContact = {
                name,
                email,
                phone,
                favorie,
                owner: req.session.userID,
            } 

                const newUser = await Contacts.create(createContact);
                res.json(newUser)
                
    } catch (err) {
           return res.status(400).json({
        code: '400',
               Massage: "An error has accurred",
      error: err
    });
           }

    },
     async getSingleContacts(req, res, next) {
        try {
             const data = await Contacts.findOne({ owner: req.session.userID,  _id: req.params.id });
            console.log("data", data)
                res.status(201).json({
                    code: "201",
                    message: "Single Contact",
                    data: data,
                }
                )
        } catch (err) {
             res.status(400).json({
               code: '400',
                 Massage: `No contact was found for id ${req.params.id}`,
      error: err,
    });
           }
    },
    
    
    async deleteContacts(req, res, next) {
        try {
            const data = await Contacts.findOneAndDelete({ _id: req.params.id, owner: req.session.userID });
            console.log("data", data)
            res.status(200).json({
                code: "200",
                message: "Contact Deleted",
                data: data,
            }
            )
        } catch (err) {
            return res.status(400).json({
                code: '400',
                Massage: `No contact was found for id ${req.params.id}`,
                error: err
            });
        }

    
    },
    
      async updateContacts(req, res, next) {
        try {
            const data = await Contacts.findOneAndUpdate({ _id: req.params.id, owner: req.session.userID }, { $set: req.body, }, { new: true, });
             console.log("data", data)
                res.status(200).json({
                    code: "200",
                    message: "Update Contact",
                    data: data,
                }
                )
        } catch (err) {
            return res.status(400).json({
               code: '400',
       Massage: `No contact was found for id ${req.params.id}`,
      error: err
    });
        }

    },
       async updateStatusContact(req, res, next) {
           try {
               const data = await Contacts.findOneAndUpdate({ _id: req.params.id, owner: req.session.userID }, { $set: req.body, }, { new: true, });
               console.log("data", data)
               res.status(200).json({
                   code: "200",
                   message: "Update Favorite",
                   data: data,
               }
               )
           } catch (err) {
               return res.status(400).json({
                   code: '400',
                   Massage: `No contact was found for id ${req.params.id}`,
                   error: err
               });
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
                req.session.userID = newUser._id
                console.log(req.session)
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
      req.session.userID = user._id
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

    },
    async userCurrent(req, res, next) {
        if (!req.session.userToken) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                
            });
         
        }
        const user = await Users.findOne({ token: req.session.userToken }).select('email subscription -_id')
 if (user) {
     return res.status(200).json({
         code: 200,       
         data: user,
                
            });
 }

    }
}

module.exports= contactController
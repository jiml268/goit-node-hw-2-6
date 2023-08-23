const router = require('express').Router();
const auth = require('../utils/auth'); 
const signedIn = require('../utils/signedIn');
const { getContacts, createContact, getSingleContacts, deleteContacts, updateContacts, updateStatusContact } = require('../controllers')
const {userLogin, createUser, userLogout, userCurrent,patchUser, uploadFile, userVerification, resendemail} = require('../controllers')
router.route('/contacts').get(auth, getContacts).post(auth, createContact)
router.route('/contacts/:id').get(auth, getSingleContacts).delete(auth, deleteContacts).put(auth, updateContacts)
router.route('/contacts/:id/favorite').patch(auth, updateStatusContact)
router.route('/contacts/:id/favorite').patch(auth, updateStatusContact)


router.route('/users/signup').post(signedIn, createUser)
router.route('/users/login').post(signedIn, userLogin)
router.route('/users/logout').post(userLogout)
router.route('/users/current').get(userCurrent)
router.route('/users/patch').patch(patchUser)
router.route('/users/avatar').post(uploadFile)
router.route('/auth/verify/:verificationToken').get(userVerification)
router.route('/users/verify/').post(resendemail)



module.exports = router;

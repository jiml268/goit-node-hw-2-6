const router = require('express').Router();
const { getContacts, createContact, getSingleContacts, deleteContacts, updateContacts, updateStatusContact } = require('../controllers')


router.route('/').get(getContacts).post(createContact)
router.route('/:id').get(getSingleContacts).delete(deleteContacts).put(updateContacts)
router.route('/:id/favorite').patch(updateStatusContact)

module.exports = router;

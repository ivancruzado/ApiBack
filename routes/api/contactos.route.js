var express = require('express')
var router = express.Router()
var ContactController = require('../../controllers/contacto.controller');
var Authorization = require('../../auth/authorization');



router.post('/', ContactController.createContacto)

router.get('/contactos', ContactController.getContactos)

router.put('/update', Authorization, ContactController.updateContactos)
router.delete('/delete', Authorization, ContactController.removeContacto)



// Export the Router
module.exports = router;
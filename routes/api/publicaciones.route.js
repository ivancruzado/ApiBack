var express = require('express')
var router = express.Router()
var PubliController = require('../../controllers/publi.controller');
var Authorization = require('../../auth/authorization');



// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/:publiNum',PubliController.DetallePublicacion)
router.post('/',PubliController.createPublicacion)

router.get('/usuario/:idUsuario',PubliController.getPubliById)

router.put('/update', Authorization, PubliController.updatePubli)

router.delete('/delete/:id', Authorization, PubliController.removePublicacion)
router.get('/',PubliController.getUsers)



// Export the Router
module.exports = router;
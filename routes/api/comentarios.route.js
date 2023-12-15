var express = require('express')
var router = express.Router()
var ComentController = require('../../controllers/coment.controller');
var Authorization = require('../../auth/authorization');


router.post('/', ComentController.createComentario)

router.get('/', ComentController.getComentarios)

router.put('/update', Authorization, ComentController.updateComentario)
router.delete('/delete', Authorization, ComentController.removeComentario)



// Export the Router
module.exports = router;
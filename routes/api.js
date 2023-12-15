/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var publi = require('./api/publicaciones.route')
var coment = require('./api/comentarios.route')
var contacto = require('./api/contactos.route')

router.use('/users', users);
router.use('/publicaciones',publi)
router.use('/comentarios',coment)
router.use('/contactos',contacto)

module.exports = router;

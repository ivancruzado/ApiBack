var contactoService = require('../services/contactos.service');
const Publi = require('../models/Publicaciones.model');



// Saving the context of this module inside the _the variable
_this = this;



exports.createContacto = async function (req, res, next) {

    const{PubliId} = req.body
    const publi = await Publi.findById(PubliId)

    var Contact = {
        nombre:req.body.nombre,
        mensaje:req.body.mensaje,
        mail:req.body.mail,
    }
    try {
        var createdContact = await contactoService.createContacto(Contact,publi)
        return res.status(201).json({createdContact, message: "Succesfully Created contact"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "contact Creation was Unsuccesfull"})
    }
}

exports.removeContacto = async function (req, res, next) {
    
    var id = req.body.ID;
    try {
        var deleted = await contactoService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateContactos = async function (req, res, next) {
    console.log(req.body)
    const id = req.body.ID;
    const body = req.body
    try {
        var updatedUser = await contactoService.updateDetails(id,body)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getContactos = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Contactos = await contactoService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Contactos, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
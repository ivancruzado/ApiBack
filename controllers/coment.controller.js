var comentService = require('../services/comentarios.service');
const Publi = require('../models/Publicaciones.model');
_this = this;



exports.createComentario = async function (req, res, next) {
    
    const{publiId} = req.body
    const publi = await Publi.findById(publiId)
    
    var Coment = {
        name:req.body.name,
        texto:req.body.texto,
        calificacion:req.body.calificacion,
        mail:req.body.mail
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdComent = await comentService.createComent(Coment,publi)
        return res.status(201).json({createdComent, message: "Succesfully Created coment"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "coment Creation was Unsuccesfull"})
    }
}

exports.removeComentario = async function (req, res, next) {
    console.log(req.headers)
    var id = req.body.ID;
    try {
        var deleted = await comentService.deleteComent(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateComentario = async function (req, res, next) {
    
    const id = req.body.ID;
    const body = req.body
    try {
        var updatedComent = await comentService.updateComent(id,body)
        return res.status(200).json({status: 200, data: updatedComent, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}


exports.getComentByid = async function (req, res, next) {
    
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 15;
    let filtro= {_id: req.params.idUsuario}
    try {
        var Users = await comentService.getPublicacionesByIdUsuario(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
  }

exports.getComentarios = async function (req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {   
        var Comentarios = await comentService.getComents({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comentarios, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
const publiService = require('../services/publicaciones.service');
const CloudinaryService = require('../services/cloudinary');
const fs = require('fs-extra');
const User = require('../models/User.model');


// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List


exports.DetallePublicacion = async function (req, res, next) {
    //console.log(req.params.publiNum)
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 15;
    let filtro= req.params.publiNum
    try {
        var Users = await publiService.getPublicacionesByIdPublicacion(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}



exports.getPubliById = async function (req, res, next) {
    
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 15;
    let filtro= {_id: req.params.idUsuario}
    try {
        var Users = await publiService.getPublicacionesByIdUsuario(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}



exports.createPublicacion = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log(req.files)
    const{userId} = req.body
    const user = await User.findById(userId)

    
    var Publi = {
        tittle: req.body.tittle,
        descripcion: req.body.descripcion,
        categoria:req.body.categoria,
        tipoClase:req.body.tipoClase,
        Frecuencia: req.body.Frecuencia,
        duracion:req.body.duracion,
        Costo:req.body.Costo,
        date:new Date(),
        user: user._id
    }
    if(req.files?.image){
        const result = await CloudinaryService.uploadImage(req.files.image.tempFilePath)
        Publi.image = {
            public_id:result.public_id,
            secure_url:result.secure_url
        }
        await fs.unlink(req.files.image.tempFilePath)
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdPubli = await publiService.createPost(Publi,user)

        return res.status(201).json({createdPubli, message: "Succesfully Created Publication"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Publication Creation was Unsuccesfull"})
    }
}



exports.updatePubli = async function (req, res, next) {
    
    const id = req.body.ID;
    console.log(req.body)
    const body = req.body
    try {
        var updatedUser = await publiService.updatePublication(id,body)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}



exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var publi = await publiService.getAll(page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: publi, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removePublicacion = async function (req, res, next) {
    const id = req.params.id
    try {
        var deleted = await publiService.deletePubli(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}



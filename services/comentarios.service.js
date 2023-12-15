var Coment = require('../models/comentarios.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Publi = require('../models/Publicaciones.model');

// Saving the context of this module inside the _the variable
_this = this



exports.createComent= async function (coment,publi) {

    
    var newComent = new Coment({
        name: coment.name,
        texto: coment.texto,
        calificacion:coment.calificacion,
        publicacion: publi,
        mail:coment.mail,
        date: new Date(),
        
    })

    try {
        publi.comentarios = publi.comentarios.concat(newComent._id)
        await publi.save()
        var savedComent = await newComent.save();
        var token = jwt.sign({
            id: savedComent._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Coment")
    }
}

exports.updateComent = async function (id, body) {
    try {
      const result = await Coment.updateOne({ _id: id }, body);
      
      // Check if the update was successful
      if (result.nModified > 0) {
        return {
          status: 200,
          message: "User updated successfully",
        };
      } else {
        return {
          status: 404,
          message: "User not found or no changes made",
        };
      }
    } catch (error) {
      // Handle any errors that occurred during the update
      return {
        status: 500,
        message: error.message || "Internal Server Error",
      };
    }
  };

exports.getComents = async function (query, page, limit) {
    const comentarios = await Coment.find({}).populate('publicacion')
    return comentarios;
};



exports.deleteComent = async function (id) {

    try {
        var deleted = await Coment.deleteOne({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}

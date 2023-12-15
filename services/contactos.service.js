var Contacto = require('../models/contactos.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this


exports.createContacto= async function (contacto,publi) {

    
    var newContacto = new Contacto({
        nombre:contacto.nombre,
        mensaje: contacto.mensaje,
        mail:contacto.mail,
        publicacion: publi,
        date: new Date(),
    })

    try {
        publi.contactos = publi.contactos.concat(newContacto._id)
        await publi.save()
        var savedContacto = await newContacto.save();
        var token = jwt.sign({
            id: savedContacto._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Contact")
    }
}

exports.updateDetails = async function (id, body) {
    try {
      const result = await Contacto.updateOne({ _id: id }, body);
      
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

exports.getUsers = async function (query, page, limit) {
    const contactos = await Contacto.find({}).populate('publicacion')
    return contactos;
};

exports.deleteUser = async function (id) {

    try {
        var deleted = await Contacto.deleteOne({
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
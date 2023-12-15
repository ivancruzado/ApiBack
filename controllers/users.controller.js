const { default: mongoose } = require('mongoose');
var UserService = require('../services/user.service');
const User = require('../models/User.model');
const {sendMail,ResetPassword} = require('../services/mail');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getUsersByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    console.log(filtro)
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        telefono:req.body.telefono,
        titulo: req.body.titulo,
        experiencia: req.body.experiencia
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.createUser(User)
        return res.status(201).json({loginUser, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function (req, res, next) {

    const id = req.params;
    console.log(id)
    const body = req.body
    
    try {
        var updatedUser = await UserService.updateUser(id,body)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}



exports.removeUser = async function (req, res, next) {

    var id = req.body.ID;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        if (loginUser===0)
            return res.status(400).json({message: "Error en la contraseña"})
        else
            return res.status(201).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.updateExp = async function (req, res, next) {
    
    const id = req.body.ID;
    
    const body = req.body
    try {
        var updatedUser = await UserService.updateDetails(id,body)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.forgotPassword = async function (req, res, next) {
    const {email} =  req.body;  

    
    try {
            const user = await User.findOne({email})
            console.log(user)
            if (user) {
              await ResetPassword(user);
            }
            return res.json({
              message:
                "Se ha enviado un email para reestablecer la contraseña",
            });
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;
    console.log(req.body)
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const userId = decoded.id;
      console.log(userId)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "El usuario no existe" });
      }
      var hashedPassword = bcrypt.hashSync(password, 8);
      user.password = hashedPassword;
      await user.save();
      return res.json({ message: "Contraseña restablecida" });
    } catch (error) {
      if (error) {
        console.log(error)
        return res.status(403).json({ message: "Token expirado" });
      }
    }
  };


    
    

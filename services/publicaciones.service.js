var Publi = require('../models/Publicaciones.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/User.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List


exports.getPublicacionesByIdUsuario = async function (query, page, limit) {
    const publis = await User.find(query).populate('publicaciones')
    return publis;
}

exports.getPublicacionesByIdPublicacion = async function (query, page, limit) {
    const publis = await Publi.findById(query).populate('user')
    return publis;
}


exports.createPost = async (post,user) => {
    var newPost = new Publi({
        tittle: post.tittle,
        descripcion: post.descripcion,
        categoria:post.categoria,
        tipoClase:post.tipoClase,
        Frecuencia: post.Frecuencia,
        duracion:post.duracion,
        Costo:post.Costo,
        date:new Date(),
    })
    try {
        user.publicaciones = user.publicaciones.concat(newPost._id)
        await user.save()
        return await Publi.create(post);
    } catch (error) {
        
        throw new Error(error.message);
    }
};

exports.getAll = async function (query, page, limit) {
    
    const publis = await Publi.find().populate('user')
    return publis;
}

exports.getPostById = async (id) => await Publi.findById(id, { attributes: postsAttributes, include: postsInclude });


exports.updatePublication = async function (id, body) {
    try {
      const result = await Publi.updateOne({ _id: id }, body);
      
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

  
exports.deletePubli = async function (id) {
    console.log("el id es:",id)
    // Delete the User
    try {
        var deleted = await Publi.findOneAndDelete({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Publication Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Publication")
        
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}
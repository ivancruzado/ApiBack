// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {
    const users = await User.find({}).populate('publicaciones')
    return users
}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    
    var newUser = new User({
        name: user.name,
        email: user.email,
        date: new Date(),
        Titulo:user.Titulo,
        Experiencia: user.Experiencia,
        password: hashedPassword,
        telefono:user.telefono
    })

    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:savedUser};
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (id, body) {
    try {
      const result = await User.updateOne({ _id: id }, body);
      
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

  exports.updateDetails = async function (id, body) {
    try {
      const result = await User.updateOne({ _id: id }, body);
      
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





    /*var id = {name :user.name}
    console.log(id)
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne(id);
        console.log (oldUser)
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.name = user.name
    oldUser.email = user.email
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }*/



exports.deleteUser = async function (id) {
    console.log(id)

    try {
        var deleted = await User.deleteOne({
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
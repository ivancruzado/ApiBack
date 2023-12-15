var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        unique: [true, 'Email address must be unique'],
        required:true
    },
    password: {
        type:String,
        required:true
    },
    telefono:Number,
    publicaciones:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'publicaciones'
        }
    ],
    contactos:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'contactos'
        }
    ],
    date: Date,
    Titulo:{
        type:String,
    },
    Experiencia:{
        type:String,
    }
}) 

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;
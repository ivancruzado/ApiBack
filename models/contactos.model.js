var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ContactoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    mensaje:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        Enum:["Pendiente","En curso","Cancelado","Finalizado"],
        default:"Pendiente"
    },
    publicacion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'publicaciones'
    },
    date:Date
})

ContactoSchema.plugin(mongoosePaginate)
const Contacto = mongoose.model('contactos', ContactoSchema)

module.exports = Contacto;
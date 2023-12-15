var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ComentariosSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    texto:{
        type:String,
        required:true
    },
    calificacion:{
        type:Number,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        Enum:["Pendiente","Aceptado","Rechazado"],
        default:"Pendiente"
    },
    publicacion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'publicaciones'
    },
    date:Date
})

ComentariosSchema.plugin(mongoosePaginate)
const Coment = mongoose.model('comentarios', ComentariosSchema)

module.exports = Coment;
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PubliSchema = new mongoose.Schema({
    tittle: {type:String,
        required:true},
    descripcion: {type:String,
        required:true},
    categoria:{type:String,
        required:true},
    tipoClase:{
        type:String,
        Enum:["Individual","Grupal"],
        required:true
    },
    Frecuencia:{
        type:String,
        Enum:["Unica","Semanal","Mensual"],
        required:true
    },
    duracion:String,
    Costo:Number,
    Publicado:{
        type:Boolean,
        default:true,
        required:true
    },
    calificacion:{
        type:Number,
        default:0
    },
    image: {
        public_id:String,
        secure_url:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comentarios:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'comentarios'
        }
    ],
    contactos:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'contactos'
        }
    ],
    date: Date
})

PubliSchema.plugin(mongoosePaginate)
const Publi = mongoose.model('publicaciones', PubliSchema)

module.exports = Publi;
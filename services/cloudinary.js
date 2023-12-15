const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLODINARY_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLODINARY
});


async function uploadImage(filePath){
    return await cloudinary.uploader.upload(filePath,{
        folder:'App'
    })
}

async function deleteImage(publicId){
    return await cloudinary.upload.destroy(publicId)
}


/*const image = './images/imagen1.jpg'
cloudinary.uploader.upload(image).then(result=>{
    console.log(result.secure_url);
});

(async function run(){
    await cloudinary.uploader.upload(image)
    console.log(result.secure_url);
})();*/


module.exports = {
    uploadImage,
    deleteImage,
};



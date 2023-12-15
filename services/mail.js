var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


     const sendMail = async (email, subject, text) => {
         try {
            const config ={
                host:'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'ivanc2814@gmail.com',
                    pass: process.env.GMAIL_PASS
                }
            }
             const transporter = nodemailer.createTransport(config);
    
             const mailOptions = {
                 from: 'ivanc2814@gmail.com',
                 to: email,
                 subject:subject,
                 text: text,
             };
    
             const info = await transporter.sendMail(mailOptions);
             console.log(`Email sent: ${info.response}`);
         } catch (error) {
             console.log(error);
         }
     }

    const ResetPassword = async (user) => {
        const { email, name } = user;
        var token = jwt.sign({
            id: user._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        const PasswordUrl = `http://localhost:5173/reset-password/${token}`;
        const subject = "Restablecimiento de Contraseña";
      
        const text = `Hola ${name}, haz click en este link para cambiar tu contraseña: ${PasswordUrl}`;
        await sendMail(email, subject, text);
      };
     module.exports = {
        sendMail,
        ResetPassword
    };
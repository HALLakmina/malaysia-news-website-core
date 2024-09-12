const nodemailer = require('nodemailer')
const fs = require('fs')
const {promisify} = require('util')
require("dotenv").config();

const htmlFile =promisify(fs.readFile)

const createEmailTemplate = () =>{
    try{
        return nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_SERVICE_HOST,
            port: process.env.EMAIL_SERVICE_PORT,
            secure: process.env.EMAIL_SERVICE_SECURE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    catch(error){
        console.log('Error creating transporter', error);
        return null;
    }
}

const sendContactUsDetailsToPageAdmin = async (contactDetails) => {
    try{
        const sendContactUsDetailsToPageAdminHTML = await htmlFile('./emailTemplate/newContactDetailsEmail.html', 'utf-8')
        
        const sendContactUsDetailsToPageAdminDynamicHTML = sendContactUsDetailsToPageAdminHTML
        .replace('{{FIRST_NAME}}',contactUs.firstName)
        .replace('{{LAST_NAME}}',contactUs.lastName)
        .replace('{{EMAIL}}',contactUs.email)
        .replace('{{NUMBER}}',contactUs.phone)
        .replace('{{MESSAGE}}',contactUs.message || '-')

        const mailOptions = {
            form:{
                name: process.env.FORM_EMAIL_NAME || '',
                address: process.env.FORM_EMAIL_ADDRESS || ''
            },
            to: process.env.TO_EMAIL || '',
            cc: process.env.CC_EMAIL || '',
            subject: process.env.EMAIL_SUBJECT || '',
            html: sendContactUsDetailsToPageAdminDynamicHTML
        }

        const transporter = createEmailTemplate()

        if(!transporter){
            throw new Error('Transporter creation failed.')
        }
        await transporter.sendMail(mailOptions)
        return true
    }
    catch(error){
        console.error('Error sending email:', error);
        return false;
    }
}

module.exports ={ sendContactUsDetailsToPageAdmin }
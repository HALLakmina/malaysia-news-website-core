const mongoose = require('mongoose');
require('dotenv').config()

const Validator = require('../middleware/validator');
const validatorConfig = require('../util/validatorConfig');

var adminService = require('../services/admin-services')

const adminSeed = async () => {
    const ADMIN = require('../seedData/admin-data.json')
    try{
        let validAdmins =[]
        for(let i=0; i< ADMIN.length; i++) {
            const admin = ADMIN[i]
            const validatorResult = Validator.validator(admin, validatorConfig.createAdminReqBodyValidatorConfig)
            if(validatorResult?.error){
                console.log("Invalid Payload",i)
                continue
            }
            validAdmins.push(admin)
        }
        mongoose.connect(process.env.MONGODB_URL)

        for(let n=0; n< validAdmins.length; n++){
            const admin = validAdmins[n]
            const foundAdmin = await adminService.findAdminByEmail(admin.email)
            if(foundAdmin){
                console.log("Admin Already Exists",n)
                continue
            }
            const newAdmin = await adminService.createAdmin(admin)
            console.log(newAdmin)
            if(newAdmin){
                console.log("Admin Create Failed")
                continue
            }
        }
    }
    catch(error){
        console.log(error)
    }
    finally{
        mongoose.disconnect()
    }
}
adminSeed();
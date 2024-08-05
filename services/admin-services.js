const { hashPassword } = require ('../util/hash')
const Admin = require('../models/admin-model')


const findAdminByEmail = async (email) =>{
    try{
        const admin = await Admin.findOne({email})
        return admin
    }
    catch(error){
        throw admin
    }
}

const createAdmin = async (payload) =>{
    try{
        const { firstName, lastName, email, password } = payload;
        const hash_Password = await hashPassword(password)
        const addAdmin = new Admin({firstName, lastName, email, password: hash_Password});
        await addAdmin.save();
    }
    catch(error){
        throw error
    }
}

module.exports = { findAdminByEmail, createAdmin }
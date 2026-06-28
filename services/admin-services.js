const bcrypt = require('bcrypt')
const { hashPassword } = require('../util/hash')
const { generateJwtToken } = require('../util/generateJwtToken')
const adminRepository = require('../repositories/admin-repository')

const findAdminByEmail = (email) => adminRepository.findOne({ email })

const createAdmin = async (payload) => {
    const { firstName, lastName, email, password } = payload
    const hash_Password = await hashPassword(password)
    await adminRepository.create({ firstName, lastName, email, password: hash_Password })
}

const comparePassword = (password, hash) => bcrypt.compare(password, hash)

const generateToken = (email, password) => generateJwtToken(email, password)

module.exports = { findAdminByEmail, createAdmin, comparePassword, generateToken }

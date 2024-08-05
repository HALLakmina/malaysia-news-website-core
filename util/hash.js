const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    const hash_password = bcrypt.hash(password, 10)
    return hash_password
}

module.exports = {
    hashPassword
}
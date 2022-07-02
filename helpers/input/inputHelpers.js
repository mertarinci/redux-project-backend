const bcrypt = require("bcryptjs");


const validateUserInput = (username,password) => {
    return username && password;
}

const comparePassword = (password,hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword);
}

const validateUpdatePost = (title,content) => {
    return title && content;
}



module.exports = {
    validateUserInput,
    comparePassword,
    validateUpdatePost
}
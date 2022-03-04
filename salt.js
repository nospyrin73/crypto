const {
    scryptSync, randomBytes
} = require('crypto');

let users = [];

function signup(email, password) {
    if (!users.some((element) => element.email === email)) {
        let salt = randomBytes(16).toString('hex');
        let key = scryptSync(password, salt, 64).toString('hex');
        
        let user = {
            email,
            password: key,
        };

        users.push(user);
        
        return user;
    }

    return null;
}

module.exports = {
    users, signup
};
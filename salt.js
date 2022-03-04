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
            password: `${salt}:${key}`,
        };

        users.push(user);
        
        return user;
    }

    return null;
}

function login(email, password) {
    const user = users.find(elem => elem.email === email);

    if (user) {
        const [salt, key] = user.password.split(':');
        const hashedPassword = scryptSync(password, salt, 64).toString('hex');

        if (key === hashedPassword) {
            return user;
        }
    }

    return null;
}

module.exports = {
    users, signup, login
};
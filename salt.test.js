const { users, signup} = require('./salt.js');

let user = {
    email: 'mohamed.zuhair@protonmail.ch',
    password: 'p4$$w0rd'
};

afterEach(() => {
    users.length = 0;
});

test('successful signup', () => {  
    expect(signup(user.email, user.password)).not.toBeNull();
});

test('duplicate email on signup', () => {
    signup(user.email, user.password);
    expect(signup(user.email, user.password)).toBeNull();
});
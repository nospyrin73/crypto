const { users, signup, login } = require('./salt.js');

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

test('user count increase reflected in db', () => {
    let userCount = users.length;
    signup(user.email, user.password);

    expect(userCount + 1).toBe(users.length);
});

test('duplicate email on signup', () => {
    signup(user.email, user.password);
    expect(signup(user.email, user.password)).toBeNull();
});

describe('login', () => {
    beforeEach(() => {
        signup(user.email, user.password);
    });
    
    afterEach(() => {
        users.length = 0;
    });

    test('successful login', () => {
        expect(login(user.email, user.password)).not.toBeNull();
    });

    test('wrong email', () => {
        expect(login('imaginary.email@unicorn.net', user.password))
            .toBeNull();
    });

    test('wrong password', () => {
        expect(login(user.email, 'dr0$$4p')).toBeNull();
    });
});
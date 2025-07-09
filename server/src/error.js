// errors.js
class UserAlreadyExistsError extends Error {
    constructor(message = 'User already exists') {
        super(message);
        this.name = 'UserAlreadyExistsError';
    }
}

class UnknownError extends Error {
    constructor(message = 'Unknown database error') {
        super(message);
        this.name = 'UnknownError';
    }
}

class UserDontExistError extends Error {
    constructor(message = 'User dontExistError') {
        super(message);
        this.name = 'UserDontExistError';
    }
}

module.exports = {
    UserAlreadyExistsError,
    UnknownError,
    UserDontExistError
};

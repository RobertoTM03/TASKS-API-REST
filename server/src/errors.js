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

class TaskNotFoundError extends Error {
    constructor(message = 'Task not found') {
        super(message);
        this.name = 'TaskNotFoundError';
    }
}

module.exports = {
    UserAlreadyExistsError,
    UnknownError,
    UserDontExistError,
    TaskNotFoundError,
};

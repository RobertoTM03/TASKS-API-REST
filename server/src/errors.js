class UserAlreadyExistsError extends Error {
    constructor(message = 'User already exists') {
        super(message);
        this.name = 'UserAlreadyExistsError';
    }
}

class InvalidCredentialsError extends Error {
    constructor(message = 'Invalid credentials') {
        super(message);
        this.name = 'InvalidCredentialsError';
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

class PermissionDeniedError extends Error {
    constructor(message = 'Permission denied') {
        super(message);
        this.name = 'PermissionDeniedError';
    }
}

module.exports = {
    UserAlreadyExistsError,
    InvalidCredentialsError,
    UnknownError,
    UserDontExistError,
    TaskNotFoundError,
    PermissionDeniedError
};

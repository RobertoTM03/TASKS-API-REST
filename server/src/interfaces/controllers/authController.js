const UserRepositoryImpl = require('../../infrastructure/db/UserRepositoryImpl');
const hashService = require('../../infrastructure/auth/hashService');
const jwtService = require('../../infrastructure/auth/jwtService');

const RegisterUser = require('../../application/use_cases/auth/RegisterUser');
const LoginUser = require('../../application/use_cases/auth/LoginUser');

const userRepository = new UserRepositoryImpl();

const registerUser = new RegisterUser(userRepository, hashService);
const loginUser = new LoginUser(userRepository, hashService, jwtService);

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await registerUser.execute({ email, password });
        res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        console.error(err);
        if (err.name === 'UserAlreadyExistsError') {
            res.status(409).json({ error: 'User already exists' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const token = await loginUser.execute({ email, password });
        res.json({ token });
    } catch (err) {
        console.error(err);
        if (err.name === 'UserDontExistError') {
            res.status(404).json({ error: 'User dont exist' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

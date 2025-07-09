class LoginUser {
    constructor(userRepository, hashService, jwtService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }

    async execute({ email, password }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isValid = await this.hashService.compare(password, user.password);
        if (!isValid) throw new Error('Invalid credentials');

        return this.jwtService.sign({userId: user.id, email: user.email});
    }
}

module.exports = LoginUser;
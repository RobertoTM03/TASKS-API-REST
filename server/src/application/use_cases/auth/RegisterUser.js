class RegisterUser {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }

    async execute( {email, password} ) {
        const hashedPassword = await this.hashService.hash(password);
        return await this.userRepository.createUser({ email: email, password: hashedPassword });
    }
}

module.exports = RegisterUser;
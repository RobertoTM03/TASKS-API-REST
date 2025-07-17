const {InvalidCredentialsError} = require("../../../errors");

class LoginUser {
    constructor(userRepository, hashService, jwtService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }

    async execute( {email, password} ) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new InvalidCredentialsError();

        const isValid = await this.hashService.compare(password, user.password);
        if (!isValid) throw new InvalidCredentialsError();

        return this.jwtService.sign({ id: user.id, email: user.email });
    }
}

module.exports = LoginUser;
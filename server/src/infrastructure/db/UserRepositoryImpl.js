const UserRepository = require('../../domain/repositories/UserRepository');
const pool = require('./index');
const User = require('../../domain/entities/User');
const { v4: uuidv4 } = require('uuid');
const { UserAlreadyExistsError, UnknownError, UserDontExistError} = require("../../error");

class UserRepositoryImpl extends UserRepository {
    async createUser(user) {
        const id = uuidv4();
        const query = `
      INSERT INTO users (id, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, email, password
    `;
        const values = [id, user.email, user.password];

        try {
            const result = await pool.query(query, values);
            const row = result.rows[0];
            return new User({
                id: row.id,
                email: row.email,
                password: row.password
            });
        } catch (error) {
            if (error.code === '23505') { // Duplicated key error catch
                throw new UserAlreadyExistsError();
            } else {
                throw new UnknownError(error.message);
            }
        }
    }

    async findByEmail(email) {
        const query = `
      SELECT id, email, password FROM users
      WHERE email = $1
    `;
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) throw new UserDontExistError();

        const row = result.rows[0];
        return new User({
            id: row.id,
            email: row.email,
            password: row.password
        });
    }
}

module.exports = UserRepositoryImpl;

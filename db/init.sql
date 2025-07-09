CREATE TABLE IF NOT EXISTS tasks (
                                     id SERIAL PRIMARY KEY,
                                     description TEXT NOT NULL,
                                     ownerId UUID NOT NULL
);

CREATE TABLE users (
                       id UUID PRIMARY KEY,
                       email TEXT UNIQUE NOT NULL,
                       password TEXT NOT NULL
);

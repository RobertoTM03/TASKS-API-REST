CREATE TABLE IF NOT EXISTS tasks (
                                     id SERIAL PRIMARY KEY,
                                     description TEXT NOT NULL
);

INSERT INTO tasks (description) VALUES
                                    ('Tarea de prueba 1'),
                                    ('Tarea de prueba 2'),
                                    ('Tarea de prueba 3');

const TaskRepository = require('../../domain/repositories/TaskRepository');
const pool = require('./index');
const Task = require('../../domain/entities/Task');
const { UnknownError, TaskNotFoundError } = require('../../errors');

class TaskRepositoryImpl extends TaskRepository {
    async createTask(taskText, ownerId) {
        const query = `
            INSERT INTO tasks (description, owner_id)
            VALUES ($1, $2)
            RETURNING id, description, owner_id, created_at
        `;
        const values = [taskText, ownerId];

        try {
            const result = await pool.query(query, values);
            const row = result.rows[0];
            return new Task(
                row.id,
                row.description,
                row.owner_id,
                row.created_at
            );
        } catch (error) {
            throw new UnknownError(error.message);
        }
    }

    async findTasksByOwnerId(ownerId) {
        const query = `
            SELECT id, description, owner_id, created_at
            FROM tasks
            WHERE owner_id = $1
            ORDER BY created_at DESC
        `;

        console.log("OwnerId: " + ownerId);

        try {
            const result = await pool.query(query, [ownerId]);
            return result.rows.map(
                row =>
                    new Task(
                        row.id,
                        row.description,
                        row.owner_id,
                        row.created_at
                    )
            );
        } catch (error) {
            throw new UnknownError(error.message);
        }
    }

    async findTaskById(taskId) {
        const query = `
            SELECT id, description, owner_id, created_at
            FROM tasks
            WHERE id = $1
        `;

        try {
            const result = await pool.query(query, [taskId]);
            if (result.rows.length === 0) throw new TaskNotFoundError();

            const row = result.rows[0];
            return new Task(
                row.id,
                row.description,
                row.owner_id,
                row.created_at
            );
        } catch (error) {
            if (error instanceof TaskNotFoundError) throw error;
            throw new UnknownError(error.message);
        }
    }

    async deleteTaskById(taskId) {
        const query = `
            DELETE FROM tasks
              WHERE id = $1
            RETURNING id
        `;

        try {
            const result = await pool.query(query, [taskId]);
            if (result.rows.length === 0) throw new TaskNotFoundError();
            return result.rows[0].id;
        } catch (error) {
            if (error instanceof TaskNotFoundError) throw error;
            throw new UnknownError(error.message);
        }
    }

    async updateTask(taskId, taskNewText) {
        const query = `
            UPDATE tasks
            SET description = $1
            WHERE id = $2
            RETURNING id, description, owner_id, created_at
        `;
        const values = [taskNewText, taskId];

        try {
            const result = await pool.query(query, values);
            if (result.rows.length === 0) throw new TaskNotFoundError();

            const row = result.rows[0];
            return new Task(
                row.id,
                row.description,
                row.owner_id,
                row.created_at
            );
        } catch (error) {
            if (error instanceof TaskNotFoundError) throw error;
            throw new UnknownError(error.message);
        }
    }
}

module.exports = TaskRepositoryImpl;

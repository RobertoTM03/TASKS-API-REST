const {PermissionDeniedError} = require("../../../errors");

class DeleteTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute( {taskId, ownerId} ) {
        let task = this.taskRepository.getTaskById(taskId);
        if (task.ownerId !== ownerId) throw new PermissionDeniedError();
        return await this.taskRepository.deleteTaskById(taskId);
    }
}

module.exports = DeleteTask;
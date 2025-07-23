const {PermissionDeniedError} = require("../../../errors");

class UpdateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute( {taskId, taskText, ownerId} ) {
        let task = this.taskRepository.getTaskById(taskId);
        if (task.ownerId !== ownerId) throw new PermissionDeniedError();
        return await this.taskRepository.updateTask(taskId, taskText);
    }
}

module.exports = UpdateTask;
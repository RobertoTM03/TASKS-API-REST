const {PermissionDeniedError} = require("../../../errors");

class GetTaskById {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute( {taskId, ownerId} ) {
        let task = await this.taskRepository.findTaskById(taskId);
        if (task.ownerId !== ownerId) throw new PermissionDeniedError();
        return task;
    }
}

module.exports = GetTaskById;
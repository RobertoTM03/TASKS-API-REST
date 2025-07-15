class UpdateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute( {taskId, taskText} ) {
        return await this.taskRepository.updateTask(taskId, taskText);
    }
}

module.exports = UpdateTask;
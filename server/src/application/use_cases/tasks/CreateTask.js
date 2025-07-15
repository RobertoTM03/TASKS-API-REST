class CreateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute( {taskText, ownerId} ) {
        return await this.taskRepository.createTask(taskText, ownerId);
    }
}

module.exports = CreateTask;
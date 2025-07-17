class GetAllUserTasks {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute( {ownerId} ) {
        return await this.taskRepository.findTasksByOwnerId(ownerId);
    }
}

module.exports = GetAllUserTasks;
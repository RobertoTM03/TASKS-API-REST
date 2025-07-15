class Task {
    constructor(id, description, ownerId, createdAt) {
        this.id = id;
        this.description = description;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
    }
}

module.exports = Task;
// TrafficViolation.js
const { v4: uuidv4 } = require('uuid');

class TrafficViolation {
    constructor(type, priority, fine) {
        this.id = uuidv4();
        this.type = type;
        this.priority = priority;
        this.fine = fine;
        this.timestamp = new Date();
    }
}

module.exports = TrafficViolation;

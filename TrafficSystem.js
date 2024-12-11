// TrafficSystem.js
const TrafficViolation = require('./trafficviolation');
const fs = require('fs');

class TrafficSystem {
    constructor() {
        this.queue = []; // priority queue as an array
        this.history = []; // stack for undo functionality
    }

    // Add a violation to the system
    reportViolation(type, priority, fine) {
        const violation = new TrafficViolation(type, priority, fine);
        this.queue.push(violation);
        this.queue.sort((a, b) => b.priority - a.priority); // Sort by priority descending
        this.history.push(violation);
        return violation;
    }

    // Process the highest-priority violation
    processViolation() {
        if (this.queue.length === 0) return null;
        const violation = this.queue.shift(); // Remove the highest-priority violation
        this.generateInvoice(violation);
        return violation;
    }

    // Undo the last reported violation
    undoLastViolation() {
        if (this.history.length === 0) return null;
        const lastViolation = this.history.pop();
        this.queue = this.queue.filter(v => v.id !== lastViolation.id); // Remove from queue
        return lastViolation;
    }

    // Generate invoice for a processed violation
    generateInvoice(violation) {
        const invoice = `Violation ID: ${violation.id}\nType: ${violation.type}\nFine: $${violation.fine}\nDate: ${violation.timestamp}\n\n`;
        try {
            fs.appendFileSync('invoices.txt', invoice, 'utf8');
            console.log("Invoice generated for violation ID:", violation.id);
        } catch (err) {
            console.error("Failed to write invoice:", err);
        }
    }

    // Generate a JSON report for all violations
    generateReport() {
        const reportData = this.history.map(v => ({
            id: v.id,
            type: v.type,
            priority: v.priority,
            fine: v.fine,
            timestamp: v.timestamp
        }));
        try {
            fs.writeFileSync('violations_report.json', JSON.stringify(reportData, null, 2), 'utf8');
            console.log("Report generated successfully.");
        } catch (err) {
            console.error("Failed to write report:", err);
        }
    }
}

module.exports = TrafficSystem;

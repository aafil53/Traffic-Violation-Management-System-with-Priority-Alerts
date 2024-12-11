// index.js
const express = require('express');
const TrafficSystem = require('./trafficsystem');

const app = express();
const port = 3000;
const trafficSystem = new TrafficSystem();

app.use(express.json());

// Report a new violation
app.post('/report', (req, res) => {
    const { type, priority, fine } = req.body;
    const violation = trafficSystem.reportViolation(type, priority, fine);
    res.status(201).json({ message: 'Violation reported', violation });
});

// Process the highest-priority violation
app.get('/process', (req, res) => {
    const violation = trafficSystem.processViolation();
    if (!violation) {
        return res.status(404).json({ message: 'No violations to process' });
    }
    res.json({ message: 'Violation processed', violation });
});

// Undo the last reported violation
app.post('/undo', (req, res) => {
    const violation = trafficSystem.undoLastViolation();
    if (!violation) {
        return res.status(404).json({ message: 'No violations to undo' });
    }
    res.json({ message: 'Last violation undone', violation });
});

// Generate a report of all violations
app.get('/report/generate', (req, res) => {
    trafficSystem.generateReport();
    res.json({ message: 'Report generated successfully' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

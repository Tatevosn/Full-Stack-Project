const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

const employees = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
];

app.get('/api/v1/employees', (req, res) => {
    res.json(employees);
});

app.get('/api/v1/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find((employee) => employee.id === id);
    if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
    } else {
        res.json(employee);
    }
});

app.post('/api/v1/employees', (req, res) => {
    const { name, email } = req.body;
    const employee = { id: employees.length + 1, name, email };
    employees.push(employee);
    res.json(employee);
});

app.put('/api/v1/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find((employee) => employee.id === id);
    if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
    } else {
        const { name, email } = req.body;
        employee.name = name;
        employee.email = email;
        res.json(employee);
    }
});

app.delete('/api/v1/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex((employee) => employee.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Employee not found' });
    } else {
        employees.splice(index, 1);
        res.json({ message: 'Employee deleted successfully' });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
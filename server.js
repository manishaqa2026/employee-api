
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const employees = [];

app.get("/", (req, res) => {
    res.json({
        message: "Employee Management API Running"
    });
});

app.get("/employees", (req, res) => {
    res.json(employees);
});
app.post("/employees", (req, res) => {

    const firstName = req.body.personalInfo?.firstName;

    if (
        firstName === null ||
        firstName === undefined
    ) {
        return res.status(400).json({
            message: "First Name is required"
        });
    }

    if (typeof firstName !== "string") {
        return res.status(400).json({
            message: "Invalid First Name"
        });
    }

    if (!/^[A-Za-z ]+$/.test(firstName)) {
        return res.status(400).json({
            message: "First Name format invalid"
        });
    }

    const salary = req.body.salary;

    if (salary === null || salary === undefined) {
        return res.status(400).json({
            message: "Salary is required"
        });
    }

    if (!Number.isInteger(salary)) {
        return res.status(400).json({
            message: "Salary must be a whole number"
        });
    }

    if (salary < 30000) {
        return res.status(400).json({
            message: "Salary must be at least 30000"
        });
    }

    if (salary > 200000) {
        return res.status(400).json({
            message: "Salary cannot exceed 200000"
        });
    }

    const employee = {
        ...req.body,
        id: uuidv4()
    };

    employees.push(employee);

    res.status(201).json(employee);
});



app.get("/employees/:id", (req, res) => {

    const employee = employees.find(
        emp => emp.id === req.params.id
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.json(employee);
});
app.put("/employees/:id", (req, res) => {
 
const employeeIndex = employees.findIndex(
emp => emp.id === req.params.id
);
 
if (employeeIndex === -1) {
return res.status(404).json({
message: "Employee not found"
});
}
 
employees[employeeIndex] = {
...req.body,
id: req.params.id
};
 
res.json(employees[employeeIndex]);
});
app.delete("/employees/:id", (req, res) => {

    const employeeIndex = employees.findIndex(
        emp => emp.id === req.params.id
    );

    if (employeeIndex === -1) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employees.splice(employeeIndex, 1);

    res.json({
        message: "Employee deleted successfully"
    });
});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
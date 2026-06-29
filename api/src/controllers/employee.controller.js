const  employees = require("../data/employees");

const getEmployees = (req, res) => {

    res.json(employees);

};

const getEmployeeById = (req, res) => {
    const id = Number(req.params.id);

    // on cherche l'employee
    const employee = employees.find((employee) => {
        return employee.id === id;
    });

    if (!employee) {
        return res.status(404).json({ message: "Employee introuvable" });
    }

    res.json(employee);
};

const createEmployee = (req, res) => {
    const { firstname, lastname } = req.body;

    // Validation des champs
    if (!firstname || !lastname) {
        return res.status(400).json({
            message: "Veuillez remplir tous les champs"
        });
    }

    const lastEmployee = employees[employees.length - 1];
    const newEmployeeId = lastEmployee.id + 1;

    const newEmployee = {
        id: newEmployeeId,
        firstname, // raccourci de firstname: firstname
        lastname, // raccourci de lastname: lastname
    };

    // Rajout dans le tableau des employés
    employees.push(newEmployee);

    res.status(201).json({
        message: "Employee créé avec succès",
    });
};


const deleteEmployee = (req, res) => {

    const id = Number(req.params.id);

    const employeeIndex = employees.findIndex((employee) => {
        return employee.id === id;
    });

    if (employeeIndex === -1) {
        return res.status(400).json({
            message: "Impossible de trouver cet employee"
        });
    } else {
        employees.splice(employeeIndex, 1);
        res.status(200).json({
            message: "Employee supprimé avec succès",
        });
    }

};


const editEmployee = (req, res) => {

    const id = Number(req.params.id);
    const { firstname, lastname } = req.body;

    // Validation des champs
    if (!firstname || !lastname) {
        return res.status(400).json({
            message: "Veuillez remplir tous les champs"
        });
    }

    // on cherche l'employee
    const employee = employees.find((employee) => {
        return employee.id === id;
    });

    if (!employee) {
        return res.status(404).json({ message: "Employee introuvable" });
    }

    
        employee.firstname = firstname; // req.body.firstname
        employee.lastname = lastname; // req.body.lastname

        res.status(200).json({
            message: "Employé modifié avec succés"
        });
       
};

module.exports = { getEmployees, getEmployeeById, createEmployee, deleteEmployee, editEmployee };
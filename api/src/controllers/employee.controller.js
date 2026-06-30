const { Employee } = require("../models");


const getEmployees = async (req, res) => {

    try {
        const employees = await Employee.findAll();
        return res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur interne du serveur"
        });
    };
};

const getEmployeeById = async (req, res) => {

    const id = Number(req.params.id);

    try {
        // on cherche l'employee
        const employee = await Employee.findByPk(id)
        if (!employee) {
            return res.status(404).json({
                message: "L'employé n'existe pas"
            });
        };

        return res.json(employee);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur interne du serveur"
        });
    };
};

const createEmployee = async (req, res) => {
    const { firstname, lastname } = req.body;

    // Validation des champs
    if (!firstname || !lastname) {
        return res.status(400).json({
            message: "Veuillez remplir tous les champs"
        });
    }

    const newEmployee = {
        firstname, // raccourci de firstname: firstname
        lastname, // raccourci de lastname: lastname
    };

    try {

        const employee = await Employee.create(newEmployee);

        return res.status(201).json(employee);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Erreur interne du serveur"
        });

    };
}


const deleteEmployee = async (req, res) => {

    const id = Number(req.params.id);

    try {

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employé introuvable"
            });
        }

        await employee.destroy();

        return res.status(200).json({
            message: "Employé supprimé avec succés"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Erreur interne du serveur"
        });
    };

};


const editEmployee = async (req, res) => {

    const id = Number(req.params.id);
    const { firstname, lastname } = req.body;

    // Validation des champs
    if (!firstname || !lastname) {
        return res.status(400).json({
            message: "Veuillez remplir tous les champs"
        });
    }
    try {
        // on cherche l'employee
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee introuvable"
            });
        }


        employee.firstname = firstname; // req.body.firstname
        employee.lastname = lastname; // req.body.lastname

        await employee.save();

        return res.status(200).json({
            message: "Employé modifié avec succés"
        });

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Erreur interne du serveur"
        });
    };

};

module.exports = { getEmployees, getEmployeeById, createEmployee, deleteEmployee, editEmployee };
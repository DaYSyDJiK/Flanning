const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee.controller");

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);

router.post("/", employeeController.createEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.put("/:id", employeeController.editEmployee);

module.exports = router;
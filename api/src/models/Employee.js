const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/database.js");


class Employee extends Model { }

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize: sequelize,
        modelName: "Employee",
        tableName: "employees",
        timestamps: false,
    }
);



module.exports = Employee;
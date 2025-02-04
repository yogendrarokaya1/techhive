const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("../database/db");

// Define the Users model
const Users = sequelize.define("Users", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true, 
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Sync the model with the database
(async () => { 
    try {
        await Users.sync(); // Use `alter: true` to update the table without dropping data
        console.log("The Users table has been created or updated.");
    } catch (error) {
        console.log("Error syncing the Users model:", error.message);
    }
})();

module.exports = Users;

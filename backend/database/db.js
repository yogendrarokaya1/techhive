const Sequelize = require("sequelize")
const sequelize = new Sequelize("techhive","postgres","P@yogesh4165",{ // database , username , password
    host : "localhost",
    dialect: "postgres"
})
const connection = async ()=>{
    try {
        await sequelize.authenticate()
        console.log("Connection establised")
    } catch (error) {
        console.log("An error occured", error.message);
    }
}

module.exports = {sequelize , connection}
const Users = require("../model/userSchema");
 
const getAllUsers = async (req, res) => {
  console.log("Get Alls");
  try {
    const users = await Users.findAll();
 
    if (users.length === 0) {
      return res.status(200).json("All Users are fetched");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error While fetching");
  }
};
 
const saveAllUsers = async (req, res) => {
  console.log(req.body);
  const {userId, name, email, contact, address } = req.body;
  try {
    const user = await Users.findOne({ where: { userId: userId } });
 
    if (user == null) {
      await Users.create(req.body);
      return res.status(201).json({ message: "Users Added Sucessfully" });
    }
    return res.status(500).json({ message: "user is already Present" });
  } catch (error) {
    console.log(error);
  }
};
 
module.exports = { getAllUsers, saveAllUsers };
const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    console.log("Request body:", req.body); // Log the request body
    try {
        const userData = new User(req.body);
        const {email}=userData;

        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User Already Exists."});
        }
        const savedUser=await userData.save();
        res.status(201).send({ message: 'Data inserted successfully', user: userData });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send({ message: 'Error inserting user' });
    }
};


// Get all users
exports.getUsers = async (req, res) => {
    console.log("Received request for users");
    try {
        const users = await User.find();
        if(users.length===0)
        {
            return res.status(404).json({message:"No Users"});
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send({ message: 'Error retrieving users', error });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    console.log("Updating user with ID:", req.params.id);
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Data updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    console.log("Deleting user with ID:", req.params.id);
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: 'Error deleting user', error });
    }
};

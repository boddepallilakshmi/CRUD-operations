const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/users/createUser', userController.createUser);
router.get('/users/getAllUsers', userController.getUsers);
router.put('/users/updateUser/:id', userController.updateUser);
router.delete('/users/deleteUser/:id', userController.deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD routes for users
router.post('/store', userController.createUser);
router.get('/getalluser', userController.getAllUsers);
router.put('/:id/update', userController.updateUser);
router.patch('/:id', userController.updateUser); 
router.get('/:id/getsingleUser', userController.getSingleUser);
router.put('/:id/update-status', userController.activateDeactivateUser);

module.exports = router;

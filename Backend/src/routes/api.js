
const express = require('express')
const apiController = require('../controllers/apiController')
const userController = require('../controllers/userController')
const groupController = require('../controllers/groupController')
const projectController = require('../controllers/projectController')
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTactions')
const router = express.Router()
//router.all('*', checkUserJWT, checkUserPermission)
router.post('/register', apiController.registerUser)
router.post('/login', apiController.loginUser)
router.get('/user/show', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user/create', userController.createUser);
router.put('/user/update/:id', userController.updateUser);
router.delete('/user/delete/:id', userController.deleteUser);

//group
router.get('/group/show', groupController.getAllGroups);

//project
router.get('/project/show', projectController.getAllProject)
router.post('/project/create', projectController.getCreateProject)
router.delete('/project/delete/:id', projectController.getDeleteProject)
module.exports = router
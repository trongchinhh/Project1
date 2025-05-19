
const express = require('express')
const homeController = require('../controllers/homeController')
const router = express.Router()
router.get('/', homeController.getHomePage)
router.get('/user', homeController.getUser)
router.post('/users/create_user', homeController.getCreateUser)
router.post('/deleteUser/:id', homeController.getDeleteUser)
router.get('/editUser/:id', homeController.getUserWithId)
router.post('/updateUser/:id', homeController.getUpdateUser)

module.exports = router

const userServicr = require('../services/CRUDservices')
const getHomePage = async (req, res) => {


    return res.render('home.ejs')
}
const getUser = async (req, res) => {
    let users = await userServicr.handleGetAllUser()

    return res.render('user.ejs', { users })
}

const getCreateUser = async (req, res) => {
    let { username, email, password } = req.body
    let hashPassword = await userServicr.hanleHashPassword(password)
    await userServicr.handleCreateUser(username, email, hashPassword)
    return res.redirect('/user');
}
const getDeleteUser = async (req, res) => {
    let id = req.params.id
    await userServicr.handleDeleteUser(id)
    return res.redirect('/user');
}
const getUserWithId = async (req, res) => {
    let id = req.params.id
    let user = await userServicr.hanleGetUserwith(id)
    return res.render('edit.ejs', { user })
}
const getUpdateUser = async (req, res) => {
    let id = req.params.id
    let { username, email } = req.body
    await userServicr.handleUpdateUser(id, email, username)
    return res.redirect('/user');
}
module.exports = {
    getHomePage,
    getUser, getCreateUser, getDeleteUser, getUserWithId, getUpdateUser

}
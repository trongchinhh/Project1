const { where, Model } = require('sequelize');
const db = require('../models/index')
const bcrypt = require("bcryptjs");
const { default: AsyncQueue } = require('sequelize/lib/dialects/mssql/async-queue');


const hanleHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash
}
const handleCreateUser = async (username, email, password) => {
    try {
        await db.User.create({
            email: email,
            password: password,
            username: username
        })

    } catch (err) {
        console.log(err);
    }

}
const handleGetAllUser = async () => {
    //test ralationship
    try {
        let newUser = await db.User.findOne({
            where: { id: 1 },
            include: { model: db.Group },
            raw: true,
            nest: true
        })
        let r = await db.Role.findAll({
            include: { model: db.Group, where: { id: 1 } },
            raw: true,
            nest: true
        })
        console.log("check User: ", newUser)
        console.log("check role: ", r)
    } catch (error) {
        console.log(error)

    }


    const results = await db.User.findAll()
    return results

}
const handleDeleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: { id: id }
        });


    } catch (err) {
        console.log(err);
    }
}
const hanleGetUserwith = async (id) => {
    try {
        const results = await db.User.findOne({ where: { id: id } })
        return results

    } catch (err) {
        console.log(err);
    }

}
const handleUpdateUser = async (id, email, username) => {
    try {
        await db.User.update(
            { email, username }, // các trường cần cập nhật
            { where: { id: id } }
        );


    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    handleCreateUser, hanleHashPassword, handleGetAllUser, handleDeleteUser, hanleGetUserwith, handleUpdateUser
}
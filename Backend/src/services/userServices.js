const bcrypt = require('bcryptjs');
const db = require('../models/index');

const saltRounds = 10;

const hashPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}
const checkEmail = async (email) => {
    const existingUser = await db.User.findOne({ where: { email } });
    return existingUser;
}
const handlegetAllUsers = async () => {
    return await db.User.findAll({
        attributes: { exclude: ['password'] }
    });
}
const handlegetUserById = async (id) => {
    return await db.User.findByPk(id);
}
const handlecreateUser = async (userData) => {
    let { email, password, username, phone, sex, address, groupId } = userData;
    if (await checkEmail(email)) {
        throw new Error("Email đã tồn tại.");
    }
    return await db.User.create({
        email,
        password: await hashPassword(password),
        username, phone, sex, address, groupId
    });
}
const handleupdateUser = async (id, userData) => {
    const user = await db.User.findByPk(id);
    if (!user) return null;
    await user.update(userData);
    return user;
}
const handledeleteUser = async (id) => {
    const user = await db.User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
}
module.exports = {
    handlegetAllUsers, handlecreateUser, handledeleteUser, handlegetUserById, handleupdateUser
}
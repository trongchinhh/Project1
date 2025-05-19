const userServices = require('../services/userServices')

const getAllUsers = async (req, res) => {
    const users = await userServices.handlegetAllUsers();
    res.status(200).json(users);
}
const getUserById = async (req, res) => {
    const user = await userServices.handlegetUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không Tìm thấy Người Dùng' });
    res.status(200).json(user);
}
const createUser = async (req, res) => {

    try {
        let result = await userServices.handlecreateUser(req.body);
        res.status(201).json(result);

    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}
const updateUser = async (req, res) => {
    const user = await userServices.handleupdateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'Không Tìm thấy Người Dùng' });
    res.status(200).json(user);
}
const deleteUser = async (req, res) => {
    const result = await userServices.handledeleteUser(req.params.id);
    if (!result) return res.status(404).json({ message: 'Không Tìm thấy Người Dùng' });
    res.status(200).json({ message: 'Xóa Người Dùng Thành Công' });
}
module.exports = {
    getAllUsers, getUserById, createUser, updateUser, deleteUser
}
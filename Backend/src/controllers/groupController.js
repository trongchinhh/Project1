const groupServices = require('../services/groupServices')
const getAllGroups = async (req, res) => {
    try {
        let ressult = await groupServices.handleGetAllGroups();
        if (res.errCode === 0) {
            return res.status(400).json(ressult);
        }
        return res.status(200).json(ressult);
    } catch (error) {
        return res.status(500).json({ errCode: -1, message: "Lỗi server" });
    }
}
module.exports = {
    getAllGroups
}
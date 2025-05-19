const db = require('../models/index');

const handleGetAllGroups = async () => {
    let data = await db.Group.findAll({
        order: [

            ['name', 'ASC'],
        ],
    });
    if (!data) {
        return {
            errCode: 1,
            message: 'Không có group',
            data: []
        }
    }
    return {
        errCode: 0,
        message: "thành công",
        data: data
    }

}
module.exports = {
    handleGetAllGroups
}
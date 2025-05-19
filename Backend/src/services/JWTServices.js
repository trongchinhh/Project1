
const db = require('../models/index');

const getGroupWithRoles = async (user) => {
    let roless = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ['id', 'name', 'description'],
        include: {
            model: db.Role,
            attributes: ['id', 'url', 'description'],
            through: { attributes: [] }
        }
    })
    return roless;
}
module.exports = {
    getGroupWithRoles
}
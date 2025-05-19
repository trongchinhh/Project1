const projectServices = require('../services/projectServices')

const getAllProject = async (req, res) => {
    const project = await projectServices.handleGetAllProjects();
    if (project.length === 0) {
        return res.status(401).json({
            code: -1,
            message: 'Không tồn tại project trong db...',
            data: []

        });
    }
    return res.status(200).json({
        code: 0,
        data: project

    });
}
const getCreateProject = async (req, res) => {
    const result = await projectServices.handleGetCreateProject(req.body);
    return res.status(200).json({
        message: 'Thành Công',
        data: result
    })
}
const getDeleteProject = async (req, res) => {
    const result = await projectServices.handleDeleteProject(req.params.id);
    if (!result) return res.status(404).json({ message: 'Không Tìm thấy Project' });
    res.status(200).json({ message: 'Xóa Project Thành Công' });
}
module.exports = {
    getAllProject, getCreateProject, getDeleteProject
}
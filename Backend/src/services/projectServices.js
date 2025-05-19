const db = require('../models/index');

const handleGetAllProjects = async () => {
    return await db.Project.findAll();
}

const handleGetCreateProject = async (data) => {
    return await db.Project.create(data

    );
}
const handleDeleteProject = async (id) => {
    const project = await db.Project.findByPk(id);
    if (!project) return null;
    await project.destroy();
    return true;
}
module.exports = {
    handleGetAllProjects, handleGetCreateProject, handleDeleteProject
}
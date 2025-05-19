const bcrypt = require('bcryptjs');
const db = require('../models/index');


const saltRounds = 10;
const { getGroupWithRoles } = require('./JWTServices')
const { createJWT } = require('../middleware/JWTactions')
const hashPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}
const checkEmail = async (email) => {
    const existingUser = await db.User.findOne({ where: { email } });
    return existingUser;
}
const handleRegister = async (username, phone, email, password) => {

    if (await checkEmail(email)) {
        throw new Error("Email đã tồn tại.");
    }

    const newUser = await db.User.create({
        username,
        phone,
        email,
        password: await hashPassword(password),
        groupId: 3
    });


    return {
        message: "Đăng ký thành công",
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        },


    };



}
const handleLogin = async (email, password) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
        return {
            errCode: 1,
            message: "Email không tồn tại."
        };
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return {
            errCode: 2,
            message: "Mật khẩu không đúng."
        };
    }


    let roless = await getGroupWithRoles(user)
    let payload = {
        email: user.email,
        roless,
        expiresIn: "1h"
    }
    let token = createJWT(payload);
    return {
        errCode: 0,
        message: "Đăng nhập thành công",
        user: {
            access_token: token,
            roless
        },


    };
}
module.exports = {
    handleRegister, handleLogin

}

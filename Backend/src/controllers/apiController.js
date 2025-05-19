const apiServices = require('../services/ApiServices')
const registerUser = async (req, res) => {
    let { username, phone, email, password } = req.body;
    try {
        let result = await apiServices.handleRegister(username, phone, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }



}
const loginUser = async (req, res) => {
    let { email, password } = req.body
    try {
        const result = await apiServices.handleLogin(email, password);

        // Nếu có errCode khác 0 thì trả về status 400
        if (result.errCode !== 0) {
            return res.status(400).json(result);
        }
        if (result && result.user && result.user.access_token) {
            res.cookie('jwt_token', result.user.access_token, {
                httpOnly: true,
                maxAge: 3600000 // 1 giờ

            });
        }

        // Đăng nhập thành công
        return res.status(200).json(result);
    } catch (error) {

        return res.status(500).json({ errCode: -1, message: error });

    }
}
module.exports = {

    registerUser, loginUser
}
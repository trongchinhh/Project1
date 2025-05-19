require('dotenv').config()
module.exports = {
    secret: process.env.JWT_TOKEN, // nên lưu vào biến môi trường thực tế
};

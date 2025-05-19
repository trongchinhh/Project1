const e = require("express");
const jwt = require("jsonwebtoken");

require('dotenv').config()
const nonSecurePaths = ['/', '/login', '/register', '/project/show', '/project/create',];
const matchRoute = (requestUrl, routeList) => {
    for (let route of routeList) {
        const regexStr = route.url.replace(/:[^/]+/g, '[^/]+');
        const regex = new RegExp(`^${regexStr}$`);
        if (regex.test(requestUrl)) {
            return true;
        }
    }
    return false;
}

const createJWT = (payload) => {
    let key = process.env.JWT_TOKEN;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log(error)
    }
    return token;
}
const verifyToken = (token) => {
    let key = process.env.JWT_TOKEN;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error)
    }
    return data;
}
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookie = req.cookies;
    if (cookie && cookie.jwt_token) {

        let token = verifyToken(cookie.jwt_token);
        if (token) {
            req.user = token;
            next();
        } else {
            return res.status(401).json({
                errCode: -1,
                data: '',
                message: "Not Authenticated the  User"
            })
        }
    } else {
        return res.status(401).json({
            errCode: -1,
            data: '',
            message: "Not Authenticated the  User "
        })
    }

}
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    if (req.user) {
        let roles = req.user.roless.Roles;
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                errCode: -1,
                data: '',
                message: "Bạn không có quyền truy cập vào trang này..."
            })
        }
        let canAccess = matchRoute(currentUrl, roles);

        if (canAccess) {
            next();
        } else {
            return res.status(403).json({
                errCode: -1,
                data: '',
                message: "Bạn không có quyền truy cập vào trang này..."
            })
        }
    } else {
        return res.status(403).json({
            errCode: -1,
            data: '',
            message: "Bạn không có quyền truy cập vào trang này..."
        })
    }
}
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}
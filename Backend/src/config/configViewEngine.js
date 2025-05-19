const express = require('express')
const path = require('path')
const configViewEngine = (app) => {
    app.use(express.static(path.join('./src', 'public')))
    //config template engine
    app.set('views', './src' + '/views')
    app.set('view engine', 'ejs')
}
module.exports = configViewEngine;
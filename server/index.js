const express = require('express')
const app = express()
const port = 3000
const home=require('./router/Home')
const test=require('./router/Test')
const song=require('./router/Song')
//跨域
app.use((req, res, next) => {
    //设置请求头
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Max-Age': 1728000,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    })
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/home',home);
app.use('/song',song);
app.use('/test',test);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

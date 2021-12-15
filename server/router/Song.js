const express=require('express');
const router=express.Router();
const {song_detail,lyric,song_url} = require('NeteaseCloudMusicApi');

router.use(function (res,req,next) {
    console.log(`经过song中间件 res:${res.method},${res.url}`);
    next();
})
router.get('/detail',(req,res)=>{
    let id=req.query.id;
    getSong(id).then(result=>{
        res.send(result)
    })
})
router.get('/lyric',(req,res)=>{
    let id=req.query.id
    getLyric(id).then(result=>{
        res.send(result)
    })
})
router.get('/url',(req,res)=>{
    getUrl().then(result=>{
        res.send(result)
    })
})
async function getUrl() {
    try {
        const result2 = await song_url({
            id:1899450446
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
async function getLyric(id) {
    try {
        const result2 = await lyric({
            id:id
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
async function getSong(id) {
    let ids=id+'';//拼接字符串转换成字符串
    try {
        const result2 = await song_detail({
            ids:ids
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
module.exports=router
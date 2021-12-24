const express=require('express');
const router=express.Router();
const {playlist_detail,playlist_track_all} = require('NeteaseCloudMusicApi');

router.use(function (res,req,next) {
    console.log(`经过playlist中间件 res:${res.method},${res.url}`);
    next();
})
router.get('/detail',(req,res)=>{
    let id=req.query.id;
    getPlaylist(id).then(result=>{
        res.send(result)
    })
})
router.get('/all',(req,res)=>{
    let id=req.query.id;
    getAll(id).then(result=>{
        res.send(result)
    })
})
async function getAll(id) {
    try {
        const result2 = await playlist_track_all({
            id:id,
            limit:100
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
async function getPlaylist(id) {
    try {
        const result2 = await playlist_detail({
            id:id
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
module.exports=router
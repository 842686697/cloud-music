const express=require('express');
const router=express.Router();
const {song_detail} = require('NeteaseCloudMusicApi');

router.use(function (res,req,next) {
    console.log(`经过song中间件 res:${res.method},${res.url}`);
    next();
})
router.get('/song',(req,res)=>{
    const ids=req.query;
    getSong(ids).then(result=>{
        res.send(result)
    })
})
async function getSong(ids) {
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
const express=require('express');
const router=express.Router();
const {album} = require('NeteaseCloudMusicApi')

router.use(function (res,req,next) {
    next()
})
router.get('/',(req,res)=>{
    let id=req.query.id;
    getAlbumInfo(id).then(result=>{
        res.send(result)
    })
})
async function getAlbumInfo(id) {
    try {
        const result2 = await album({
            id:id
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
module.exports=router
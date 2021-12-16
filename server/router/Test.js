const express=require('express');
const router=express.Router();
const {playlist_track_all} = require('NeteaseCloudMusicApi')

router.use(function (res,req,next) {
    next()
})
router.get('/',(req,res)=>{
    main().then(result=>{
        res.send(result)
    })
})
async function main() {
    try {
        const result2 = await playlist_track_all({
            id:7020312267
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
module.exports=router
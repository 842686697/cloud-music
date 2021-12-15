const express=require('express');
const router=express.Router();
const {song_url} = require('NeteaseCloudMusicApi')

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
        const result2 = await song_url({
            id:1899450446
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
module.exports=router
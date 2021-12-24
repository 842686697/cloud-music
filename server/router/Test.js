const express=require('express');
const router=express.Router();
const {album} = require('NeteaseCloudMusicApi')

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
        const result2 = await album({
            id:136630921
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
module.exports=router
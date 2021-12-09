const express=require('express');
const router=express.Router();
const {login_cellphone,homepage_block_page,banner} = require('NeteaseCloudMusicApi');

router.use(function (res,req,next) {
    console.log(`经过home中间件 res:${res.method},${res.url}`);
    next();
})
router.get('/recommend',(req,res)=>{
    main().then((result)=>{
        console.log('recommend')
        res.send(result)
    })

})
async function main() {
    try {
        // const result = await login_cellphone({
        //     phone: '13330221130',
        //     password: 'px13330221130'
        // })
        const result2 = await banner({
            // cookie: result.body.cookie // 凭证
        })
        return result2
    } catch (error) {
        console.log(error)
    }
}
module.exports=router
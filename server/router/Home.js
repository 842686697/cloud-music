const express=require('express');
const router=express.Router();
const {banner,top_playlist,album_list,playlist_detail,top_artists} = require('NeteaseCloudMusicApi');

router.use(function (res,req,next) {
    console.log(`经过home中间件 res:${res.method},${res.url}`);
    next();
})
router.get('/banner',(req,res)=>{
    getBanner().then((result)=>{
        console.log('recommend')
        res.send(result)
    })

})
router.get('/hot',(req,res)=>{
    getHot().then(result=>{
        res.send(result)
    })
})
router.get('/newAlbum',(req,res)=>{
    getNewAlbum().then(result=>{
        res.send(result)
    })
})
router.get('/topListLeft',(req,res)=>{
    getTopListLeft().then(result=>{
        res.send(result)
    })
})
router.get('/topListCenter',(req,res)=>{
    getTopListCenter().then(result=>{
        res.send(result)
    })
})
router.get('/topListRight',(req,res)=>{
    getTopListRight().then(result=>{
        res.send(result)
    })
})
router.get('/topArtists',(req,res)=>{
    getTopArtists().then(result=>{
        res.send(result)
    })
})
//获取热门歌手排行（代替入驻歌手）
async function getTopArtists() {
    try {
        const result2 = await top_artists({
            limit:5
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
//获取飙升榜left数据
async function getTopListLeft() {
    try {
        const result2 = await playlist_detail({
            id:19723756
        })
        return result2.body
    } catch (error) {
        console.log(error)
    }
}
async function getTopListCenter() {
    try {
        const result2 = await playlist_detail({
            id:3779629
        })
        return result2.body
    } catch (error) {
        console.log(error)
    }
}
async function getTopListRight() {
    try {
        const result2 = await playlist_detail({
            id:2884035
        })
        return result2.body
    } catch (error) {
        console.log(error)
    }
}
//获取新碟上架
async function getNewAlbum() {
    try {
        const result2 = await album_list({
            limit:10
        })
        return result2.body
    } catch (error) {
        console.log(error)
    }
}
//获取热门歌单推荐
async function getHot() {
    try {
        const result2 = await top_playlist({
            limit:8
        })
        return result2.body

    } catch (error) {
        console.log(error)
    }
}
//获取首页活动轮播图
async function getBanner() {
    try {
        const result2 = await banner({
        })
        return result2
    } catch (error) {
        console.log(error)
    }
}
module.exports=router
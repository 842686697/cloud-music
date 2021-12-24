<template>
    <div class="footer">
        <mian class="content">
            <div class="left">
                <div>联系邮箱：842686697@qq.com | QQ：842686697</div>
            </div>
            <div class="right">
                <div class="img_1"></div>
                <div class="img_2"></div>
                <div class="img_3"></div>
                <div class="img_4"></div>
                <div class="img_5"></div>
            </div>
        </mian>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .footer{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 173px;
        border-top: 1px #a8a8a8 solid;
        background-color: #f2f2f2;
    }
    .content{
        display: flex;
        width: 980px;
    }
    .left{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 520px;
    }
    .left div{
        font-size: 12px;
        color: gray;
    }
    .right{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 520px;
    }
    .img_1{
        height: 50px;
        width: 47px;
        background: url("../../public/img/foot_enter_new.png") -63px -456.5px;
        background-size: 110px 552px;
    }
    .img_2{
        height: 50px;
        width: 47px;
        background: url("../../public/img/foot_enter_new.png") -63px -101px;
        background-size: 110px 552px;
    }
    .img_3{
        height: 50px;
        width: 47px;
        background: url("../../public/img/foot_enter_new.png") 1px 0px;
        background-size: 110px 552px;
    }
    .img_4{
        height: 50px;
        width: 47px;
        background: url("../../public/img/foot_enter_new.png") -63px -50px;
        background-size: 110px 552px;
    }
    .img_5{
        height: 50px;
        width: 47px;
        background: url("../../public/img/foot_enter_new.png") 0px -101px;
        background-size: 110px 552px;
    }
</style>
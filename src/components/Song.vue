<template>
    <div class="song">
        <div class="song_left"></div>
        <div class="song_right"></div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Song",
        data(){
            return{

            }
        },
        created() {
            this.getSong();
        },
        methods:{
            getSong(){
                axios.get(this.common.defaultUrl+'song',{
                    params:{
                        id:"1899450446"
                    }
                }).then(res=>{
                    console.log('test:',res.data)
                })
            },
            test(){
                this.axios.get(this.common.defaultUrl+'test').then(res=>{
                    console.log('test:',res.data)
                })
            }
        }
    }
</script>

<style scoped>
    .song{
        width: 980px;
        border-left: 1px #c2c2c2 solid;
        border-right: 1px #c2c2c2 solid;
    }
    .song_left{
        width: 709px;
    }
</style>
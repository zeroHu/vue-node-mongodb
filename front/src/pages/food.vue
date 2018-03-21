<template>
    <div class="food">
        <div class="content">
            <div class="header">
                <p class="title">美食列表</p>
                <p class="add-food" @click="gotoAdd">上传自己的菜肴</p>
            </div>
            <div class="list">
                <ul class="ul-content">
                    <li v-for="eitem in foodList">
                        <router-link :to="{ name: 'FoodDetail', params: { id: eitem._id }}" class="router-link">
                            <img :src="eitem.fShareImg" alt="">
                            <p>{{ eitem.fTitle }}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            foodList: []
        }
    },
    mounted () {
        this.getFood()
    },
    methods: {
        getFood () {
            this.$axios.get('/allfood').then(res => {
                if (res.data.status === 0){
                    this.foodList = res.data.data
                }
            })
        },
        gotoAdd () {
            this.$router.push('/addfood')
        }
    }
}
</script>
<style lang="scss">
.food {
    box-sizing: border-box;
    padding: 20px 0;
    width: 940px;
    margin: auto;
    .content {
        margin-top: 35px;
        background: #fff;
        padding: 20px;
        overflow: hidden;
        .header {
            width: 100%;
            height: 80px;
            p.title {
                display: inline-block;
                color: #12937c;
                font-size: 18px;
                line-height: 80px;
            }
            p.add-food {
                display: inline-block;
                margin-top: 20px;
                cursor: pointer;
                background: #ff9090;
                color: #fff;
                text-align: center;
                padding: 10px 0;
                width: 180px;
                border: 1px solid #ff9090;
                float: right;
            }
        }
        .ul-content {
            margin-top: 30px;
            li {
                cursor: pointer;
                box-sizing: border-box;
                padding: 20px;
                background: #daeae8;
                width: 200px;
                height: 200px;
                float: left;
                text-align: center;
                margin-left: 20px;
                margin-bottom: 20px;
                img {
                    width: 160px;
                    height: 140px;
                }
                p {
                    line-height: 40px;
                    color: #b1a058;
                }
            }
        }
    }
}
</style>
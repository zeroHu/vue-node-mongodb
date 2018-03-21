<template>
    <div class="food">
        <div class="content">
            <div class="header clearfix">
                <h5>美食列表</h5>
                <router-link to="/addfood" class="router-link add-food">上传自己的菜肴</router-link>
            </div>
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
                h5 {
                    color: #12937c;
                    float: left;
                }
                .add-food {
                    padding: 10px 20px;
                    border: 1px solid #35495e;
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
<template>
    <div class="food-detail">
        <div>
            <p>食物名称：{{ foodDetail.fTitle }}</p>
            <p>食物详情： {{ foodDetail.fDesc }}</p>
            <div>
                <img :src="foodDetail.fShareImg" alt="" class="img-share">
            </div>
            <p>创建时间：{{ foodDetail.time }}</p>
            <p>创建人：{{ foodDetail.createUser && foodDetail.createUser.userName }}</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            foodDetail: {}
        }
    },
    mounted () {
        this.foodId = this.$route.params.id || ''
        this.getDetail()
    },
    methods: {
        getDetail () {
            this.$axios.get(`/fooddetail?id=${this.foodId}`).then(res => {
                this.foodDetail = res.data.data[0]
            })
        }
    }
}
</script>
<style lang="scss">
.food-detail {
    box-sizing: border-box;
    padding: 20px;
    width: 940px;
    margin: auto;
    .img-share {
        width: 300px;
        height: 300px;
    }
    p {
        line-height: 30px;
    }
}
</style>
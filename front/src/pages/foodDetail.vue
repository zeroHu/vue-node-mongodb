<template>
    <div class="food-detail">
        <div>
            <img :src="foodDetail.fShareImg" alt="" class="img-share">
            <p><label for="">食物名称：</label>{{ foodDetail.fTitle }}</p>
            <p><label for="">食物详情：</label> {{ foodDetail.fDesc }}</p>
            <p class="p-info">{{ foodDetail.createUser && foodDetail.createUser.userName }} {{ foodDetail.time }}</p>
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
    background: #fff;
    overflow: hidden;
    margin-top: 20px;
    .img-share {
        width: 300px;
        height: 300px;
        float: left;
        margin-right: 20px;
    }
    .p-info {
        margin-top: 20px;
        color: #999;
    }
    p {
        line-height: 30px;
        font-size: 14px;
        color: #666;
        label {
            color: #333;
        }
    }
}
</style>
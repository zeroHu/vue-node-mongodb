<template>
    <div class="comment-title page-wrapper">
        <v-header></v-header>
        <div class="comment-title-content">
            <p class="title">话题区，点击下面的话题就可以进入和喜欢这个话题的人进行探讨啦</p>
            <ul>
                <li v-for="(item, index) in commTitle" @click="routerDetail(item._id, item.ctitle)">
                    {{ item.ctitle }} >>>
                </li>
            </ul>
            <p class="tips">目前只支持管理员添加话题，如果有人真的喜欢这个版块，管理员可以改为每个人都可以进行话题的添加，管理员来审核话题哟</p>
        </div>
    </div>
</template>
<script>
import vHeader from '@/components/header.vue';
export default {
    components: {
        vHeader
    },
    mounted () {
        this.$axios.get('/showcotit').then(res => {
            if (res.data.status === 0) {
                this.commTitle = res.data.data
            } else {
                console.log('展示没有话题，或者接口出现异常')
            }
        });
    },
    data () {
        return {
            commTitle: []
        }
    },
    methods: {
        routerDetail (id, name) {
            this.$router.push(`/commentdetail?id=${id}&name=${name}`);
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment-title-content {
        box-sizing: border-box;
        width: 940px;
        padding: 20px 30px;
        margin: 100px auto 0;
        background: #f2f7f6;
        color: #37a;
        line-height: 1.6;
        .title {
            font-size: 18px;
            margin-bottom: 30px;
            color: #db3b23;
        }
        .tips {
            margin-top: 50px;
            font-size: 12px;
            color: #999;
        }
        ul {
            cursor: pointer;
            li {
                margin-top: 10px;
            }
        }
    }

</style>
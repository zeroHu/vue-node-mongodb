<template>
    <div class="comment-title page-wrapper">
        <v-header></v-header>
        <div class="comment-title-content">
            <ul>
                <li v-for="(item, index) in commTitle" @click="routerDetail(item._id, item.ctitle)">
                    {{ item.ctitle }} >>>
                </li>
            </ul>
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
            this.$router.push(`/commentdetail?id=${id}&name=${name}`)
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
        ul {
            cursor: pointer;
            li {
                margin-top: 10px;
            }
        }
    }

</style>
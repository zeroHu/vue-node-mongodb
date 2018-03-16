<!-- 管理员权限页面 -->
<template>
    <div class="root page-wrapper">
        <v-header></v-header>
        <div class="haslogin" v-if="$store.state.isRoot">
            <div class="comment-root">
                <h5>管理话题</h5>
                <div class="modify-comment">
                    <p v-for="item in commTitle" class="each-item">
                        <span v-show="item.showMo" class="c-title">{{ item.ctitle }}</span>
                        <input v-show="!item.showMo" type="text" v-model="item.ctitle" class="c-title">
                        <span class="mtd" @click="modifyComment(item)">{{ item.showMo ? '修改' : '确定' }}</span>
                        <span class="mtd" @click="deleteComment(item)">删除</span>
                    </p>
                </div>
                <div class="add-comment">
                    <label for="">添加话题:</label>
                    <input type="text" v-model="newCommet">
                    <span @click="addComment" class="add-comment-button">提交</span>
                </div>
            </div>
        </div>
        <div class="no-login" v-else>
            sorry~ 这是管理员页面，您没有权限
            <router-link to="/" class="router-link">去首页</router-link>
        </div>
    </div>
</template>
<style lang="scss">
    .haslogin {
        width: 940px;
        margin: 60px auto;
        h5 {
            font-size: 20px;
            text-align: center;
            color: #12937c;
        }
        .modify-comment {
            margin-top: 30px;
            .each-item {
                border-bottom: 1px solid #efefef;
            }
            .c-title {
                display: inline-block;
                width: 500px;
            }
            p {
                line-height: 50px;
            }
        }
        .add-comment {
            margin-top: 20px;
            .add-comment-button {
                box-sizing: border-box;
                margin-left: 20px;
                display: inline-block;
                width: 50px;
                height: 26px;
                line-height: 24px;
                border: 1px solid red;
                text-align: center;
                color: #ff9090;
            }
        }
        span.mtd {
            cursor: pointer;
            border: 1px solid red;
            padding: 2px 10px;
            color: #ff9090;
            margin-left: 20px;
        }
    }
    .no-login {
        text-align: center;
        color: #333;
        margin-top: 100px;
    }
</style>
<script>
import vHeader from '@/components/header.vue';
export default {
    components: {
        vHeader
    },
    mounted () {
        this.$axios.get('/showcotit').then(res => {
            if (res.data.status === 0) {
                res.data.data.forEach(item => {
                    item.showMo = true
                })
                this.commTitle = res.data.data
            } else {
                console.log('展示没有话题，或者接口出现异常')
            }
        });
    },
    data () {
        return {
            commTitle: [],
            newCommet: ''
        }
    },
    methods: {
        modifyComment (val) {
            val.showMo = !val.showMo;
            if (val.showMo){
                this.$axios.post('/updatecomment', {
                    id: val._id,
                    title: val.ctitle
                }).then(res => {
                    if (res.data.status === 0) {
                        alert('修改成功')
                    } else {
                        console.log('接口出现异常')
                    }
                });
            }
        },
        deleteComment (val) {
            this.$axios.post('/deletecommenttitle', {
                id: val._id,
            }).then(res => {
                if (res.data.status === 0) {
                    alert('删除成功');
                    // 刷新当前页面
                    this.$router.go(0);
                } else {
                    console.log('接口出现异常')
                }
            });
        },
        addComment () {
            this.$axios.get(`/addcotit?ctitle=${this.newCommet}`).then(res => {
                if (res.data.status === 0) {
                    alert('添加成功');
                    // 刷新当前页面
                    this.$router.go(0);
                } else {
                    console.log('接口出现异常')
                }
            });
        }
    }
}
</script>
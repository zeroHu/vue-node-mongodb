<template>
    <div class="comment page-wrapper">
        <v-header></v-header>
        <div class="content">
            <div class="title-comment">
                <h4>话题</h4>
                <div class="main">
                    <p>{{ cName }}</p>
                </div>
            </div>
            <div class="user-commet" v-show="uCommentInfo.length > 0">
                <h4>评论区</h4>
                <div class="main">
                    <div class="each" v-for="item in uCommentInfo">
                        <p class="u-detail">
                            {{ item.content }}
                        </p>
                        <p class="c-info">
                            <span>{{ item.createUser.userName }}</span>
                            <span>{{ item.createTime }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="commit-comment">
                <h4>发表吧</h4>
                <div class="c-content">
                    <textarea name="" id="" cols="30" rows="5" v-model="uComment"></textarea>
                    <button class="submit" @click="sendComment">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from '@/components/header.vue';
export default {
    components: {
        vHeader
    },
    data () {
        return {
            cId: '',
            cName: '',
            uComment: '',
            uCommentInfo: []
        }
    },
    mounted () {
        this.cId = this.$route.query && this.$route.query.id
        this.cName = this.$route.query && this.$route.query.name
        console.log('--------*******', this.cId)
        // 请求数据
        this.$axios.get(`/api/showcomment?titleid=${this.cId}`).then(res => {
            if (res.data.status === 0) {
                this.uCommentInfo = res.data.data
            }
        })
    },
    methods: {
        sendComment () {
            this.$axios.post('/api/addcomment', {
                content: this.uComment,
                titleid: this.cId || '',
                titlename: this.cName || ''
            }).then(res => {
                if (res.data.status === 0){
                    alert('添加评论成功')
                    this.$router.go(0)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .comment {
        width: 940px;
        margin: 50px auto 0;
        h4 {
            color: #072;
            line-height: 50px;
        }
        .main {
            margin-left: 50px;
            font-size: 13px;
            padding: 20px 20px;
            border: 1px dashed #daeae8;
            background: #f2f7f6;
            color: #37a;
            p {
                line-height: 1.6;
            }
        }
        textarea {
            box-sizing: border-box;
            width: 890px;
            margin-left: 50px;
        }
        .user-commet {
            .each {
                border-bottom: 1px solid #daeae8;
                padding-bottom: 12px;
                padding-top: 12px;
                &:first-child {
                    padding-top: 0;
                }
                &:last-child {
                    border-bottom: none;
                }
                .c-info {
                    color: #aaa;
                    text-align: right;
                }
            }
        }
        .commit-comment {
            .c-content {
                text-align: center;
                .submit {
                    width: 200px;
                    height: 30px;
                    background: #12937c;
                    margin: 20px auto;
                    color: #fff;
                }
            }
        }
    }
</style>
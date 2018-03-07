<template>
    <div class="comment page-wrapper">
        <v-header></v-header>
        <div class="content">
            <div class="title-comment">
                <h4>话题</h4>
                <div class="main">
                    <p>小仙女为啥自称为小仙女</p>
                </div>
            </div>
            <div class="user-commet">
                <h4>评论区</h4>
                <div class="main">
                    <div class="each">
                        <p class="u-detail">
                        讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点
                        </p>
                        <p class="c-info">
                            <span>zero</span>
                            <span>2016/12/12 12:00</span>
                        </p>
                    </div>
                    <div class="each">
                        <p class="u-detail">
                        讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点讨论第一人的观点
                        </p>
                        <p class="c-info">
                            <span>zero</span>
                            <span>2016/12/12 12:00</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="commit-comment">
                <h4>发表吧</h4>
                <div class="c-content">
                    <textarea name="" id="" cols="30" rows="5"></textarea>
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
    methods: {
        sendComment () {
            this.$axios.get('/api/commitComment', {

            }).then(res => {

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
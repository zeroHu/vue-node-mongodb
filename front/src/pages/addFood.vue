<template>
    <div class="add-food">
        <h5 class="title">上传您喜欢的食物吧</h5>
        <div>
            <ul>
                <li>
                    <label for="">食物名称:</label>
                    <input type="text" v-model="ftitle">
                </li>
                <li>
                    <label for="">食物简介:</label>
                    <textarea v-model="fdesc"></textarea>
                </li>
                <li>
                    <label for="">宣传图:</label>
                    <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="uploadFile" multiple>
                </li>
            </ul>
            <div class="add-all" @click="addAll">添加所有</div>
        </div>
    </div>
</template>
<script>
import * as qiniu from 'qiniu-js'
export default {
    data () {
        return {
            ftitle: '',
            fdesc: ''
        }
    },
    methods: {
        uploadFile (e) {
            this.$axios.get('/qiniu/token').then(res => {
                if (res.data.status === 0) {
                    let self = this;
                    let resdata = res.data.data;
                    let token = resdata.uptoken;
                    let file = e.target.files[0];
                    let filename = e.target.files.name;
                    let config = {
                        useCdnDomain: true,
                        disableStatisticsReport: false,
                        retryCount: 6,
                        region: qiniu.region.z1 //华北才是z1
                    };
                    let putExtra = {
                        fname: "",
                        params: {},
                        mimeType: null
                    };
                    var observable = qiniu.upload(file, file.name, token, putExtra, config)

                    var subscription = observable.subscribe({
                        next (res) {
                        },
                        error (err) {
                            if(err && err.code === 604) {
                                self.$toast('您已经上传了这张图，请换一张上传或更换图片名称再上传');
                            }
                        },
                        complete (res) {
                            self.$toast('上传成功');
                            this.shareimg = `http://p5vxzph29.bkt.clouddn.com/${filename}.jpg`
                            console.log('----upload end----', JSON.stringify(res))
                        }
                    }); // 上传开始
                } else {
                    console.log('接口出现异常')
                }
            });
        },
        addAll () {
            this.$axios.post('/uploadfood', {
                ftitle: this.ftitle,
                fdesc: this.fdesc,
                shareimg: this.shareimg
            }).then(res => {
                if (res.data.status === 0){
                    this.$toast('添加食谱成功');
                    setTimeout(() => {
                        this.$router.go(0)
                    }, 2500)
                }
            })
        }
    }
}
</script>
<style lang="scss">
.add-food {
    box-sizing: border-box;
    width: 940px;
    margin: auto;
    padding: 20px 0;
    input {
        width: 400px;
        margin-left: 20px;
    }
    textarea {
        width: 400px;
        height: 60px;
        margin-left: 20px;
    }
    ul {
        li {
            margin-bottom: 20px;
            label {
                vertical-align: top;
                color: #fda6ab;
            }
        }
    }

    .title {
        font-size: 18px;
        margin-bottom: 30px;
        color: #db3b23;
    }
}
</style>
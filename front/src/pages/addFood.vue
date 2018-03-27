<template>
    <div class="add-food">
        <h5 class="title">上传您喜欢的食物吧</h5>
        <div class="content">
            <ul>
                <li>
                    <span>食物名称:</span>
                    <input type="text" v-model="ftitle">
                </li>
                <li>
                    <span>食物简介:</span>
                    <textarea v-model="fdesc"></textarea>
                </li>
                <li>
                    <span>宣传图：</span>
                    <label for="file" class="lable-file-input">上传宣传图</label>
                    <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="uploadFile" multiple>
                </li>
            </ul>
            <div class="add-all" @click="addAll">添加所有</div>
        </div>
    </div>
</template>
<script>
// 七牛的sdk
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
                            self.shareimg = `http://p5vxzph29.bkt.clouddn.com/${file.name}`
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
                        this.$router.push('/food');
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
            span {
                display: inline-block;
                width: 120px;
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
    .custom-file-input {
        display: none;
    }
    .lable-file-input {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 20px;
        cursor: pointer;
        margin-left: 20px;
        font-size: 14px;
    }
    .add-all {
        cursor: pointer;
        width: 200px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: #ff9090;
        text-align: center;
        margin-left: 145px;
    }
}
</style>
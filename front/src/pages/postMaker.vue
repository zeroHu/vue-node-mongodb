<!-- 生成海报页面 -->
<template>
  <div class="maker-post">
    <h2>这是一个后端nodejs解决方案。。。。很粗糙，可以自定义位置 。。。但是还没做 。。。为啥捏。。。疲乏了</h2>
    <h2>改天再整理个前端的解决方案。。。坐等。。。</h2>
    <p>人性化的撸一把海报。。。妈妈再也不用担心我做海报的困难了。。。</p>
    <p>简介： 是不是每次都会有那么一个需要微信海报的需求，很无奈，内容就那么些，填充一个名称 ~ 一个头像 ~ 一个二维码 用于微信裂变。。。。每次都做很烦。。。想着有个api解决就好了 </p>
    <p>
      <span>理想化步骤</span>
      <br>
      第一步: 上传模板<br>
      第二步：上传微信头像 和 名字 和 微信裂变二维码的链接<br>
      第三步：也就是最后一步！ 拿图走人 手动happy。。。。
    </p>

    <p>
      好吧。。。技术有限。。。目前我只到了第二步的名字和二维码链接。。。其实第一步模板和微信头像的代码也能实现 but 我的那个方式很蠢啊 。。。不想被大神们刺伤我的小小心脏  不提那个蠢办法了（如果有人好奇。。。其实代码里面写了 但是注释掉了。。。可以自己去找。。。不要骂我）。。。等我继续修炼成精的时候 我再来修改我那个蠢方法
    </p>

    <p>好文推荐： https://www.tantao.me/2018/06/23/Node.js%E5%9B%BE%E7%89%87%E6%B7%BB%E5%8A%A0%E4%BA%8C%E7%BB%B4%E7%A0%81%E5%92%8C%E6%96%87%E5%AD%97%E7%94%9F%E6%88%90%E6%B5%B7%E6%8A%A5/index.html</p>
    <p>好文推荐： http://www.fecoding.cn/2018/05/28/advanced-guide-of-sharp/</p>
    <p>好文推荐： https://gist.github.com/semlinker/6a826648a8ba6cffe70233a2b401a5a9#file-gen-share-image-js</p>
    <p>-----------我是说正事分割线----------</p>
    
    <div>
      <label>输入生成海报的人物：</label><input type="text" v-model="name" placeholder="输入生成海报的人物名称">
    </div>
    <div>
      <label>输入生成海报的二维码：</label><input type="text" v-model="url" placeholder="生成二维码的链接">
    </div>
    <div class="submit" @click="getMakerPost">确定带参数生成海报</div>

    <img :src="imgUrl" alt="" class="post-maker">  <--------- 这个二维码是你的链接转化的哦
  </div>
</template>
<style lang="scss">
  .maker-post {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    min-height: 900px;
    width: 940px;
    margin: 20px auto;
    font-size: 14px;
    h2 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    p {
      word-break: break-all;
      margin: 40px 0;
      line-height: 1.5;
    }
    label {
      margin-right: 50px;
    }
    input {
      padding-left: 10px;
      margin-top: 50px;
      height: 40px;
      width: 300px;
    }

    .submit {
      cursor: pointer;
      margin-top: 100px;
      width: 200px;
      height: 40px;
      background: red;
      color: #fff;
      text-align: center;
      line-height: 40px;
    }

    .post-maker {
      margin-top: 100px;
      width: 50%;
      height: 30%;
    }
  }
</style>
<script>
  export default {
    data () {
        return {
          name: '我是一串文案你想不到吧',
          url: 'http://vue.zeroyh.cn',
          imgUrl: 'http://localhost/postmaker/img/1534323567892.png'
        }
    },
    methods: {
      getMakerPost () {
        this.$toast('正在请求，请稍等');
        // 请求数据
        this.$axios.get(`/poster?userName=${this.name}&qrUrl=${this.url}`).then(res => {
            if (res.data.status === 0) {
                this.imgUrl = 'http://localhost/postmaker/img/' + res.data.data.code + '.png'
            }
        })
      }
    }
  }
  </script>
<template>
  <div class="login-regist">
    <div class="nologin" v-if="$store.state.loginStatus">
      您已经登录了~
      <p><router-link to="/" class="router-link">返回首页</router-link></p>
    </div>
    <div class="logining" v-else>
      <span class="tab-check" :class="{ active: isLogin}" @click="isLogin = true">登录</span> | <span class="tab-check" :class="{ active: !isLogin}" @click="isLogin = false">注册</span>
      <div class="content">
        <div class="item">
          <label for="name" class="name">登录名:</label>
          <input type="text" v-model="name">
        </div>
        <div class="item">
          <label for="name" class="name">密码:</label>
          <input type="password" v-model="password">
        </div>
        <div class="submit" @click="isLogin ? doLogin() : doRegist()">{{ isLogin ? '登录' : '注册' }}</div>
      </div>
    </div>
    <v-modal :message="msg" :button-text="buttonText" :show-dialog="isShowDialog" @dialog-click="dialogClick"></v-modal>
  </div>
</template>

<script>
import hex_sha1 from '../assets/js/sha1.js';
import vModal from '@/components/modal.vue';
export default {
  components: {
    vModal
  },
  mounted () {
    let odo = this.$route.query && this.$route.query.do;
    let referrer = this.$route.query && this.$route.query.referrer;
    // 存referrer值
    this.referrer = referrer;
    odo && odo === 'register' ? this.isLogin = false : this.isLogin = true;
  },
  data () {
    return {
      name: '',
      password: '',
      isLogin: true,
      msg: '',
      isShowDialog: false,
      buttonText: ['知道了']
    }
  },
  methods: {
    // 登录
    doLogin () {
      this.$axios.post('/login', {
        name: this.name,
        password: hex_sha1(this.password)
      }).then(res => {
        if (res.data.status === 0) {
          this.$router.push({ path: this.referrer || '/'});
        } else {
          this.name = '';
          this.password = '';

          this.msg = res.data.msg;
          this.isShowDialog = true;
        }
      });
    },
    // 注册
    doRegist () {
      this.$axios.post('/regist', {
        name: this.name,
        password: hex_sha1(this.password)
      }).then(res => {
        if (res.data.status === -1) {
          this.name = '';
          this.password = '';
        } else {
          this.name = '';
          this.password = '';
          this.isLogin = true;
        }
        this.msg = res.data.msg;
        this.isShowDialog = true;
      });
    },
    // 接受事件
    dialogClick (val) {
      val === 'ok' || 'confirm' ? this.isShowDialog = false : ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-regist {
  margin-top: 100px;
  text-align: center;
  color: #333;
  .logining {
    box-sizing: border-box;
    width: 500px;
    height: 300px;
    padding-top: 50px;
    margin: 0 auto;
    background: #fff;
    margin-top: 20px;
    .active {
      color: #12937c;
    }
    .tab-check {
      cursor: pointer;
    }
    .content {
      margin-top: 30px;
      .item {
        margin-top: 20px;
        .name {
          text-align: left;
          display: inline-block;
          width: 65px;
        }
      }
    }
    .no-login {
      cursor: pointer;
      color: blue;
    }
    .submit {
      cursor: pointer;
      margin: 20px auto;
      width: 120px;
      padding: 5px 10px;
      background: #daeae8;
      color: #12937c;
    }
  }
  .nologin {
    color: #12937c;
    p {
      margin-top: 20px;
    }
  }
}

</style>

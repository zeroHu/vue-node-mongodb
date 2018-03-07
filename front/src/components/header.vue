<template>
    <div class="header">
        <p class="info-intro">welcome to 尬聊</p>
        <p class="info-status">
            <span v-if="$store.state.loginStatus && $store.state.loginStatus.name">
                hi, {{ $store.state.loginStatus.name }}
                <span class="no-login" @click="clearLogin">退出</span>
            </span>
            <span v-else><router-link :to="{ path: 'login', query: { do: 'register' }}" class="router-link">注册</router-link> | <router-link :to="{ path: 'login', query: { do: 'login' }}" class="router-link">登录</router-link></span>
        </p>
    </div>
</template>
<script>
    export default {
        methods: {
            clearLogin () {
                this.$axios.get('/api/clearLogin').then(res => {
                    if (res.data.status === 0) {
                        this.$store.commit('storeStatus', null)
                        alert(res.data.msg);
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .header {
        position: fixed;
        left: 0;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #daeae8;
        color: #12937c;
        padding: 0 20px;
    }
    .no-login {
        cursor: pointer;
        margin-left: 10px;
    }
    .info-status {
        float: right;
    }
    .info-intro {
        float: left;
    }
</style>
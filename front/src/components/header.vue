<template>
    <div class="header">
        <router-link class="router-link" to="/"><p class="info-intro">welcome to 尬聊</p></router-link>
        <router-link class="router-link" to="/root" v-if="$store.state.isRoot"><span class="root">管理员页面</span></router-link>
        <p class="info-status">
            <span v-if="$store.state.loginStatus && $store.state.loginStatus.name">
                hi, {{ $store.state.loginStatus.name }}
                <span class="no-login" @click="clearLogin">退出</span>
            </span>
            <span v-else><router-link :to="{ path: 'login', query: { do: 'register' }}" class="router-link">注册</router-link> | <router-link :to="{ path: 'login', query: { do: 'login' }}" class="router-link">登录</router-link></span>
        </p>
        <v-modal message="退出登录成功" :button-text="buttonText" :show-dialog="isShowDialog" @dialog-click="dialogClick"></v-modal>
    </div>
</template>
<script>
    import vModal from '@/components/modal.vue';
    export default {
        components: {
            vModal
        },
        methods: {
            clearLogin () {
                this.$axios.get('/clearLogin').then(res => {
                    if (res.data.status === 0) {
                        this.$store.commit('storeStatus', null)
                        this.isShowDialog = true;
                    }
                });
            },
            dialogClick (val) {
                val === 'ok' || 'confirm' ? this.isShowDialog = false : ''
                this.$router.go(0);
            }
        },
        data () {
            return {
                buttonText: ['知道了'],
                isShowDialog: false
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
        z-index: 1000;
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
    .root {
        margin-left: 20px;
        color: #f56621;
        cursor: pointer;
    }
</style>
<template>
    <div class="modal" v-show="showDialog">
        <div class="mask"></div>
        <div class="content">
            <div class="message">
                {{ message }}
            </div>
            <div class="action" v-show="showAction">
                <div class="two-btn" v-if="buttonText.length > 1">
                    <div class="confirm" @click="btnClick('confirm')">{{ buttonText[0] }}</div>
                    <div class="cancel" @click="btnClick('cancel')">{{ buttonText[1] }}</div>
                </div>
                <div class="one-btn" v-else>
                    <div class="ok" @click="btnClick('ok')">{{ buttonText[0] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: '您好'
        },
        showAction: {
            type: Boolean,
            default: true
        },
        showDialog: {
            type: Boolean,
            default: false
        },
        buttonText: {
            type: Array,
            default: () => {
                return ['确定', '取消']
            }
        }
    },
    methods: {
        btnClick (val) {
            console.log('-------btn click', val)
            this.$emit('dialog-click', val)
        }
    }
}
</script>
<style lang="scss">
.modal {
    position: relative;
    cursor: pointer;
    .mask {
        z-index: 3000;
        position: fixed;
        top: 0;
        lef: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .2);
        width: 100%;
        height: 100%;
    }
    .content {
        position: fixed;
        z-index: 4000;
        background: #fff;
        width: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        .message {
            text-align: center;
        }
        .action {
            margin-top: 30px;
            .two-btn {
                display: flex;
                div {
                    border: 1px solid #ccc;
                    line-height: 30px;
                    flex: 1;
                    text-align: center;
                }
            }
            .one-btn {
                width: 200px;
                margin:  auto;
                text-align: center;
                border: 1px solid #ccc;
                line-height: 30px;
            }
        }
    }
}
</style>
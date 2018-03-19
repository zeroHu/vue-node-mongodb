<template>
    <div class="modal">
        <div class="content">{{ message }}</div>
        <div class="action" v-show="showDialog">
            <div class="two-btn">
                <div class="confirm">buttonText[0]</div>
                <div class="cancel">buttonText[1]</div>
            </div>
            <div class="one-btn">
                <div class="ok">buttonText[0]</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        buttonText: {
            type: Array,
            default: ['确定', '取消']
        }
    },
    data () {
        return {
            
        }
    }
}
</script>
<style lang="scss">

</style>
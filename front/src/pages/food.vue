<template>
    <div class="food clearfix">
        <router-link to="/addfood" class="router-link add-food">上传自己的食谱吧</router-link>
        <div class="content">
            <h5>美食列表</h5>
            <ul>
                <li>美食一</li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
    .food {
        box-sizing: border-box;
        padding: 20px 0;
        width: 940px;
        margin: auto;
        .add-food {
            float: right;
        }
        .content {
            margin-top: 20px;
        }
    }
</style>
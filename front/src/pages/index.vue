<template>
    <div class="index-wrapper page-wrapper">
        <v-header></v-header>
        <div class="content ">
            <ul class="clearfix">
                <li>
                    <router-link to="/comment" class="router-link">
                        <div class="main">
                            <img src="@/assets/images/pinglun.jpeg" alt="">
                        </div>
                        <div class="text">讨论区</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/food" class="router-link">
                        <div class="main">
                            <img src="@/assets/images/food.jpeg" alt="">
                        </div>
                        <div class="text">厨艺大比拼</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/postmaker" class="router-link">
                        <div class="main">
                            <img src="@/assets/images/xiannv.jpeg" alt="">
                        </div>
                        <div class="text">来吧，制作海报, 牛牛飞起来~~~~</div>
                    </router-link>
                </li>
                <li>
                    <div class="main">
                        <img src="@/assets/images/orange.jpeg" alt="">
                    </div>
                    <div class="text">期待ing</div>
                </li>
                <li>
                    <div class="main">
                        <img src="@/assets/images/orange.jpeg" alt="">
                    </div>
                    <div class="text">期待ing</div>
                </li>
                <li>
                    <div class="main">
                        <img src="@/assets/images/orange.jpeg" alt="">
                    </div>
                    <div class="text">期待ing</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import vHeader from '@/components/header.vue';
    export default {
        components: {
            vHeader
        }
    }
</script>
<style lang="scss" scoped>
    .index-wrapper {
        background: #f8f8f7;
        .content {
            width: 940px;
            margin: auto;
            color: #12937c;
            ul {
                padding: 20px;
                list-style: none;
                li {
                    cursor: pointer;
                    float: left;
                    margin: 6px;
                    box-shadow: border-box;
                    width: 270px;
                    height: 270px;
                    padding: 8px;
                    background: #fff;
                    box-shadow: 0 2px 2px 2px #efefef;
                    .main {
                        height: 250px;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .text {
                        line-height: 25px;
                        text-align: center;
                    }
                }
            }
        }
    }

</style>
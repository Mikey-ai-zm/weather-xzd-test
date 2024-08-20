<script setup>
import { ref } from 'vue'
const props=defineProps({
    visiable:Boolean,
})

/* 点击关闭按钮时，向APP.VUE触发事件，改变属性值关闭 */
const emit=defineEmits(['close'])
const handleClick= () => {
    emit('close')
}
</script>

<template>
    <div class="instruction" :class="{show:visiable}" >
        <div class="background"></div>
        <div class="container">
            <h3>关于：</h3>
            <p>这个应用可以用来追踪你选择城市的当前天气</p>
            <br>
            <h3>如何使用:</h3>
            <p>1.点击搜索框输入你希望追踪的城市</p>
            <p>2.在搜索结果中选中一个城市，你将获取当地最新的天气</p>
            <p>3.点击右侧的＋号可以将追踪城市的天气情况保存在首页</p>
            <br>
            <h3>移出城市:</h3>
            <p>如果你不想在首页关注某个城市,可以通过底部的按钮删除它</p>
            <br>
            <el-button type="primary" @click="handleClick">关闭</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.instruction {
    
    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color:transparentize($color: #bbb9b9, $amount: 0.6);
        opacity:0;
        transition:opacity 1s ease-in-out;
    }
    
    .container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap:5px;
        padding:20px;
        width:350px;
        height:auto;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background-color: beige;
        font-size:14px;
        opacity:0;
        transition:opacity 1s ease-in-out;
    }
}
.show{
    h3{
        font-size: 18px;
    }
    .background{
        opacity:1;
        transition:all 1s ease-in-out;
    }
    .container{
        opacity:1;
        transition:all 1s ease-in-out;
    }
}
</style>

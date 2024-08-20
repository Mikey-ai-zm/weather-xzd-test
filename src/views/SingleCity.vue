<script setup>
import WeatherCard from "@/components/WeatherCard.vue";
import {getWeather} from "@/api/index";
import { ref,onMounted} from "vue";
import   { useRoute } from 'vue-router'
import { useCityStore,useTimeStore} from '@/stores/counter';

const {haveSubscribed} = useCityStore()
const {isday}=useTimeStore()
const route=useRoute()

/* 订阅与没订阅城市的视图区分 */
const isadded=!haveSubscribed(route.query.id)

const targetCity=ref()
/* 通过url获取当前城市的代码 */
targetCity.value=route.query.id || '110101'
/* 用于渲染中间的数据 */
const localCity=ref('')
const waatherInfo=ref({})

const disWind=(data)=>{
    if(String(data).split('').length>1){
        return String(data).split('-')[1]
    }
    return data
}

/* 挂载时获取axios数据 */
onMounted(async()=>{
    const res=await getWeather(targetCity.value)
    localCity.value=res.forecasts[0].city
    waatherInfo.value=res.forecasts[0].casts[0]
})
</script>

<template>
  <div class="single-city">
    <div class="head">您正在预览{{localCity}}的天气<template v-if="isadded">，可以通过右上角的"+"号按钮保存起来</template></div>
    <div class="main mid" v-if="isday">
        <span>当日气温是：{{waatherInfo.daytemp}}摄氏度</span>
        <span>当日天气是：{{waatherInfo.dayweather}}</span>
        <span>当日风向是：{{waatherInfo.daywind}}风</span>
        <span>当日风力是：≤{{disWind(waatherInfo.daypower)}}级</span>
    </div>
    <div class="main mid" v-else>
        <span>当日气温是：{{waatherInfo.nighttemp}}摄氏度</span>
        <span>当日天气是：{{waatherInfo.nightweather}}</span>
        <span>当日风向是：{{waatherInfo.nightwind}}风</span>
        <span>当日风力是：≤{{disWind(waatherInfo.nightpower)}}级</span>
    </div>
    <div class="empty"></div>
    <div class="mid"><WeatherCard :cityadcode="targetCity"></WeatherCard></div>
    
  </div>
</template>

<style scoped>
.single-city {
    color:beige;
    .head{
        width:100%;
        height:40px;
        background-color: rgb(0,78,113);
        text-align: center;
        line-height: 40px;
    }
    .main{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:20px;
        padding:30px;
    }
    .empty{
        width: 100%;
        border-bottom: 1px solid rgb(241, 241, 179);
        box-sizing: 0 0 2px rgb(235, 235, 137);
        opacity: 0.3;
        margin-bottom:10px;
    }
}
</style>
<script setup>
import { ref,onMounted,inject} from 'vue'
import { getWeather,getIPLocation} from '@/api';
import { useTimeStore} from '@/stores/counter';
const {isday}=useTimeStore()
const props=defineProps({
    cityadcode:{
        type:String,
    }
})
/* daydata nightdata 为渲染v-chart的数组 cityName为当前渲染的城市名*/
const daydata=ref()
const nightdata=ref()
const option=ref({})
const datas=ref([])
const cityName=ref('')

/* 渲染v-chart数据的方法 */
const renderChart=(daydata,nightdata,cityname)=>{
    option.value={
        xAxis:{
        type:'category',
        show:false,
        boundrayGap:false,
    },
    yAxis:{
        type:'value',
        show:false,
    },
    grid:{
        left:0,
        right:0,
        bottom:0,
        top:'30%',
    },
    tooltip:{},
    series:[
        {
            name:cityname,
            type:'line',
            data:nightdata,
            stack:'total',
            stackStrategy: 'samesign' ,
            lineStyle:{
                color:'rgb(96,162,112)',
            },
            label:{
                show:true,
                position:'top',
                formatter:'晚{c}°',
                color:'beige',
            }
        },
         {
            name:cityname,
            type:'line',
            data:daydata,
            stack:'total',
            stackStrategy: 'samesign' ,
            lineStyle:{
                color:'rgb(84,112,198)',
            },
            label:{
                show:true,
                position:'top',
                formatter:'白{c}°',
                color:'beige',
            }
        },
    ]
    }
}

onMounted(async()=>{
    const res=ref({})
    /* 传入的数据为空就获取当前的ip地址城市渲染数据--admin页面的卡片 ，不为空就根据props接收的数据渲染*/
    if(props.cityadcode==''){
        const local= await getIPLocation()
        res.value= await getWeather(local.adcode)
    }else{
        res.value=await getWeather(props.cityadcode)
    }
    //渲染星期的函数
    function formatDate(num,index){
            if(index==0){
                return '今天'
            }else if(index==1){
                return '明天'
            }else{
                const weeks=['周一','周二','周三','周四','周五','周六','周日']
                return weeks[num-1]
            }
        }
    //根据返回的数据填充需要渲染的数据
    datas.value=res.value.forecasts[0].casts.map((item,index)=>{
        if(isday){
            return{
                id:formatDate(item.week,index),
                date:item.date.slice(5),
                weather:item.dayweather,
                wind:`${item.daywind}风`,
            }
        }else{
            return{
                id:formatDate(item.week,index),
                date:item.date.slice(5),
                weather:item.nightweather,
                wind:`${item.nightwind}风`,
            }
        }
    })

    daydata.value=res.value.forecasts[0].casts.map((item,index)=>{
        return {
            name:`${formatDate(item.week,index)} 日`,
            value:item.daytemp,
        }
   })
    nightdata.value=res.value.forecasts[0].casts.map((item,index)=>{
        return {
            name:`${formatDate(item.week,index)} 夜`,
            value:item.nighttemp}
   })
    cityName.value=res.value.forecasts[0].city
    //渲染v-chart
   renderChart(daydata.value,nightdata.value,cityName.value)
   
})
</script>

<template>
<div class="container">
    <div class="outbox">
        <div class="innerbox" v-for="data in datas">
            <p>{{data.id}}</p>
            <p>{{data.date}}</p>
            <p>{{data.weather}}</p>
            <p>{{data.wind}}</p>
        </div>
    </div>
    <div class="chart">
        <v-chart :option="option"></v-chart>
    </div>
    
</div>
</template>

<style scoped>
.container{
    width:100%;
    background-color: rgb(0,78,113);
    padding:20px;
    .outbox{
        display:flex;
        justify-content: space-around;
        gap:20px;
        padding:20px;
        margin-bottom:-20px;
        .innerbox{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:30px;
        }

    }
    .chart{
        width:100%;
        height:160px;
        padding:20px;
        box-sizing: border-box;
    }
}
</style>
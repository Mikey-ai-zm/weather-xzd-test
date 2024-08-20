<script setup>
import Instruction from './components/Instruction.vue';
import { ref,onMounted,computed,onBeforeMount} from 'vue'
import {getIPLocation,getWeather} from '@/api'
import { useRoute } from 'vue-router';
const route = useRoute();
/* 调用pinia接口数据 */
import { useCityStore,useTimeStore} from '@/stores/counter';
const {AddCity,GetsubscribeCities,haveSubscribed} = useCityStore()
const {isday,SetDayNight}=useTimeStore()


/* 记录数据：   
          1..needAdd是否需要显示加号，为计算属性，一看在不在主页，而看城市是否已定阅
          2.localCity当前城市信息渲染头部区域
          3.headerInfo当前城市信息渲染头部区域*/
const needAdd=computed(()=>{
  if(route.path=='/'){
    return false
  }else{
    const citycode=route.query.id
    return !haveSubscribed(citycode)
  }
})
const reading=ref(false)
const localCity=ref('')
const headerInfo=ref({})

/* 处理风力数据的显示格式 */
const disWind=(data)=>{
    if(String(data).split('').length>1){
        return String(data).split('-')[1]
    }
    return data
}
/* 处理添加订阅城市事件 */
const addSubscribed=()=>{
  AddCity(route.query.id)
}

/* 在页面挂载前就要调用订阅数组的获取方法获取数据，要不然其他组件读不到值 */
onBeforeMount(()=>{
  GetsubscribeCities()
  SetDayNight()
})

/* 挂载时获取当前ip的信息，渲染头部区域 */
onMounted(async ()=>{
  const iploca = await getIPLocation()
  const weather = await getWeather(iploca.adcode)
  localCity.value=iploca.city
  headerInfo.value=weather.forecasts[0].casts[0]
})

</script>

<template>
<div class="header">
  <div class="mid">
    <nav>
      <router-link to="/"><h2><i class="fa-solid fa-sun"></i>&nbsp;&nbsp;新中地天气</h2></router-link>
      <div class="headerweather">
        <h4 class='city'>{{localCity}}</h4>
        <template v-if="isday">
          <span>实时天气：{{ headerInfo.dayweather}} {{headerInfo.daytemp}}°</span>
          <span>{{headerInfo.daywind}}风 ≤{{disWind(headerInfo.daypower)}}级</span>
        </template>
        <template v-else>
          <span>实时天气：{{ headerInfo.nightweather}} {{headerInfo.nighttemp}}°</span>
          <span>{{headerInfo.nightwind}}风 ≤{{disWind(headerInfo.nightpower)}}级</span>
        </template>
      </div>
      <div class="self">
        <i class="selficon1 action" @click="reading=true">i</i>
        <i class="selficon2 action" v-if="needAdd" @click="addSubscribed">+</i>
      </div>
    </nav>
  </div>
</div>
<div class="main">
  <RouterView></RouterView>
</div>
<template v-if="reading"><Instruction :visiable="reading" @close="reading=false"></Instruction></template>


</template>

<style lang="scss">
.mid{
  width:70%;
  margin:0 auto;
}
.header{
  border-bottom:1px solid rgb(0,78,113);
  box-shadow: 0 0 5px rgb(0,78,113);
  nav{
    display:flex;
    gap:20px;
    height:80px;
    align-items: center;
    a{
      color:beige;
      font-size: 1.5rem;
    line-height: 2rem;
      font-weight:500;
      text-decoration: none;
    }
    
    .headerweather{
      display: flex;
      gap:10px;
      justify-content: space-between;
      align-items: center;
      color:beige;
      .city{
        font-size: 1.125rem;
        line-height: 1.75rem;
      }
      span{
        font-size: .875rem;
        line-height: 1.75rem;
      }
    }
    .self{
      flex:1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap:10px;
      .selficon1{
        display:inline-block;
        width: 20px;
        height: 20px;
        background-color: beige;
        border-radius: 50%;
        text-align: center;
        text-shadow: 2cm;
        font:normal 750 16px 仿宋;
        cursor: pointer;
        color:rgb(0,102,138);
        transition: 1s;

      }
      .action:hover{
        transition: all 1s;
        &.selficon1{
          background-color: rgb(0,78,113);
        }
        &.selficon2{
          color:rgb(0,78,113);
        }
      }
      .selficon2{
        color:beige;
        font-size:30px;
        font-weight: 500;
        font-family: 楷体;
        cursor: pointer;
        transition: 1s;
      }
    }
  }
}
.router-link{
  text-decoration: none;
  color:beige;
  font-size:36px;
}

</style>

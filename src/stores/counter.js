import { ref, watch} from 'vue'
import { defineStore } from 'pinia'

/* 提供一个已定阅的城市商店,提供已定阅的城市数组，及数组的增删改查的方法，已经与本地存储联动的机制*/
export const useCityStore = defineStore('cityStore', () => {
  const subscribedCities = ref([])

  const AddCity=(cityadcode)=>{
    subscribedCities.value.push(cityadcode)
  }

  const GetsubscribeCities=()=>{
    subscribedCities.value=JSON.parse(localStorage.getItem('subscribedCities')) || []
  }

  const RemoveCity=(cityadcode)=>{
    console.log('delete')
    const index=subscribedCities.value.indexOf(cityadcode)
    subscribedCities.value.splice(index,1)
  }

  const haveSubscribed=(cityadcode)=>{
    return subscribedCities.value.includes(cityadcode)
  }

  watch(
    subscribedCities,
    () => {
      localStorage.setItem('subscribedCities',JSON.stringify(subscribedCities.value))
    },
    { deep: true }
  )
  return { subscribedCities,AddCity,GetsubscribeCities, RemoveCity,haveSubscribed} 
})

/* 提供一个时间商店，用于判断全局时间是白天还是黑夜，帮助各个组件渲染相应数据，在APP挂载时调用时间获取方法，获取时间 */
export const useTimeStore= defineStore('timeStore', () => {
  const isday=ref(true)

  const SetDayNight=()=>{
    const today=new Date()
    const hour=today.getHours()
    if(hour>=6 && hour<18){
      isday.value=true
    }else{
      isday.value=false
    }
  }

  return { isday,SetDayNight}
})

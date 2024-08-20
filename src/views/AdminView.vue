<script setup>
import { ref,computed} from 'vue';
import { getDistrict } from '@/api'
import { useRouter } from 'vue-router';
/* 引入组件 */
import Subscribed from '@/components/Subscribed.vue';
import WeatherCard from '@/components/WeatherCard.vue';
/* 引入pinia变量 */
import { useCityStore } from '@/stores/counter';
const {subscribedCities} = useCityStore()

const router = useRouter()
const blur = ref(false)

const isexist=computed(()=>{
    if(targetCity!='' && searchCities.value.length==0){
        return true
    }
    return false
})
const targetCity = ref('')
const cityadcode = ref('')
const searchCities = ref([])

const handleInput = async () => {
    const res = await getDistrict(targetCity.value)
    searchCities.value = res.districts.map(item => {
        return {
            adcode: item.adcode,
            name: item.name
        }
    })
}
const handleClick = (event) => {
    //console.log(event)
    if(event.pageX<120 || event.pageX>1150 || (event.target.className!="city-item" &&event.target.className!="put")){
        blur.value = false
        targetCity.value = ''
    }
}

/* 跳转目标城市 */
const toTargetCity = (city) => {
    targetCity.value = city.name
    router.push({ name: 'city', query: { id: city.adcode } })
}

/* 删除数据时，强制刷新该页面 */
const hanleUpdate = () => {
    window.location.reload()
}
</script>

<template>
    <div class="container" @click="handleClick">
        <div class="mid admin-view">
            <div class="inputbox">
                <input type="text" placeholder="请输入城市名称" v-model="targetCity" @focus="blur = true" @input="handleInput" class="put">
                <li v-if="blur" v-for="city in searchCities" @click="toTargetCity(city)">
                    <div class="city-item">{{ city.name }}</div>
                </li>
                <div class="city-item-none" v-if="isexist && blur">似乎没有找到你要找的城市</div>
            </div>

            <li v-if="!blur" v-for="city in subscribedCities">
                <Subscribed :code="city" @update="hanleUpdate"></Subscribed>
            </li>
            <div v-if="!subscribedCities.length" class="no-subscribed">暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。</div>

            <h2>近期天气</h2>
            <WeatherCard :cityadcode="cityadcode"></WeatherCard>
        </div>


    </div>
</template>

<style lang="scss" scoped>
.admin-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
    color: beige;

    input {
        width: 100%;
        height: 40px;
        border: none;
        background-color: transparent;
        border-bottom: 1px solid beige;
        color: beige;
        font-size: 18px;

        &:focus-visible {
            outline: none;
            border: none;
            border-bottom: 1px solid rgb(0, 78, 113);
            box-shadow: 0 0 3px rgb(0, 78, 113);
        }
    }

    .city-item {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        margin: 5px 0;
        background-color: rgb(0, 78, 113);
    }
    .city-item-none{
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        margin:0;
        background-color: rgb(0, 78, 113);
    }
    li {
        width: 100%;
        list-style-type: none;
    }
    .no-subscribed{
        text-align: center;
        font-size: 18px;
        color: beige;
        margin: 20px auto;
    }
    h2 {
        margin-top: 20px;
    }
}
</style>
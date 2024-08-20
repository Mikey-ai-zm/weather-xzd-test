<script setup>
import { ref, onMounted } from 'vue'
import { getWeather } from '@/api';
import { useRouter } from 'vue-router';
import { useCityStore } from '@/stores/counter';
const { RemoveCity} = useCityStore()
const router = useRouter();
const props = defineProps({
    code: {
        type: String,
        required: true
    }
})

const disBtn = ref(false)
const cityName = ref({})
const weatherInfo = ref({})
/* 处理查看，跳转 */
const toTargetCity = () => {
    router.push({ name: 'city', query: { id: props.code } })
}

const emit=defineEmits(['update'])
/* 处理删除 */
const handleDelete = () => {
    // TODO: 处理删除
    RemoveCity(props.code)
    // 通知父组件更新
    emit('update')
}

onMounted(async () => {
    const res = await getWeather(props.code)
    cityName.value = res.forecasts[0].city
    weatherInfo.value = res.forecasts[0].casts[0]
})
</script>

<template>
    <div class="oneSubscribed" @mouseleave="disBtn = false">
        <div class="information" @mouseover="disBtn = true" :class="{ dis: disBtn }">
            <span>{{ cityName }}</span>
            <span>{{ weatherInfo.daytemp }}度</span>
        </div>
        <div class="button" :class="{ dis: disBtn }">
            <el-button type="primary" size="large" @click="toTargetCity" color="#EAB308">查看</el-button>
            <el-button type="primary" size="large" @click.stop="handleDelete" color="#EAB308">删除</el-button>
        </div>
    </div>
</template>

<style scoped>
.oneSubscribed {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    .information {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: beige;
        height: 40px;
        padding: 0 20px;
        background-color: rgb(0, 78, 113);
        transition: all 0.5s;

        &.dis {
            margin-right: 20px;
            transition: all 0.3s;
        }
    }

    .button {
        display: none;

        &.dis {
            display: initial;
        }

        :deep(.el-button) {
            border-radius: 0;
            width: 60px;
            color: beige;
            font-size: 20px;
            font-weight: bold;
        }
    }
}
</style>
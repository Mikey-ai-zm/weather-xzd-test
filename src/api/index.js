import request from './request.js'

export function  getIPLocation(){
    return request({
        methods:'GET',
        url:`/ip?&key=fc0b87d528b0a41ae65591dcad4601d5`,
    })
}

export function getCityAdcode(city){
    return request({
        methods:'GET',
        url:`/geocode/geo?address=${city}&key=fc0b87d528b0a41ae65591dcad4601d5`
    })
}

export function getWeather(cityAdcode){
    return request({
        methods:'GET',
        url:`/weather/weatherInfo?city=${cityAdcode}&key=fc0b87d528b0a41ae65591dcad4601d5&extensions=all`
    })
}

export function getDistrict(keyword){
    return request({
        methods:'GET',
        url:`/config/district?keywords=${keyword}&subdistrict=0&showbiz=true&key=fc0b87d528b0a41ae65591dcad4601d5&extensions=base`
    })
}
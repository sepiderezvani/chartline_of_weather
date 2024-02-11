import {defineStore} from "pinia";
import axios from "axios";
import {computed, ref} from "vue";

export const useChartStore = defineStore('chart', () => {
    const city_1 = ref('')
    const city_2 = ref('')
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusady', 'Friday', 'Saturday']
    const city_1_data_obj = ref({})
    const city_2_data_obj = ref({})

    const search_city = async (city) => {
        let dataset_temp_day = []
        let dataset_temp_night = []
        let dataset_chart_data = [];
        let dataset_weather_data = null;
        let dataset_country_day = [];
        let dataset_temp_mid = [];
        const response = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${city.value}&units=metric&cnt=20&appid=e4479f3a20fa8233858804a5fa06b0c4`)
        dataset_chart_data = response.data.list

        response.data.list.forEach((item) => {
            const dateObj = new Date(item.dt * 1000)
            item.dt = dateObj.toLocaleDateString("en-US")
            const day_of_week = dateObj.getDay()
            dataset_country_day.push(weekday[day_of_week])
            const midTemp = ((item.temp.min + item.temp.max) / 2)
            dataset_temp_mid.push(midTemp)
            dataset_temp_day.push(item.temp.day)
            dataset_temp_night.push(item.temp.night)
        })

        return {
            'city_name': city,
            'day': dataset_temp_day,
            'night': dataset_temp_night,
            'chart_data': dataset_chart_data,
            'country_day': dataset_country_day,
            'mid': dataset_temp_mid,
        }
    }

    const temp_value_chart = computed(() => {
        return (city_obj) => {
            console.log(city_obj.value)
            return {
                labels: city_obj['country_day'],
                datasets: [
                    {
                        label: `Mid Temp ${city_obj['city_name']}`,
                        backgroundColor: '#26a65b',
                        data: city_obj['mid']
                    },
                ]
            }
        }
    })
    const temp_mix_chart =computed(()=>{
        return(city_obj1 , city_obj2)=>{
            return{
                labels :[...city_obj1['country_day']],
                datasets :[
                    {
                        label: `Mid temp ${city_obj1['city_name']}`,
                        backgroundColor: '#31c6dc',
                        data: city_obj1['mid']
                    },
                    {
                        label: `Mid temp ${city_obj2['city_name']}`,
                        backgroundColor: '#d0519e',
                        data: city_obj2['mid']
                    },
                    {
                        label: `Day temp ${city_obj1['city_name']}`,
                        backgroundColor: '#84dff1',
                        data: city_obj1['day']
                    },
                    {
                        label: `Day temp ${city_obj2['city_name']}`,
                        backgroundColor: '#ec71c1',
                        data: city_obj2['day']
                    },
                    {
                        label: `Night temp ${city_obj1['city_name']}`,
                        backgroundColor: '#0e5159',
                        data: city_obj1['night']
                    },
                    {
                        label: `Night temp ${city_obj2['city_name']}`,
                        backgroundColor: '#a4347b',
                        data: city_obj2['night']
                    },
                ]
            }
        }
    })

    // const mix_chart = computed(() => {
    //     return {
    //         labels: second_country_day.value,
    //         datasets: [
    //             {
    //                 label: 'first temp mid',
    //                 backgroundColor: '#5f29a1',
    //                 data: first_temp_mid.value
    //             },
    //             {
    //                 label: 'second temp mid',
    //                 backgroundColor: '#37bbab',
    //                 data: second_temp_mid.value
    //             },
    //             {
    //                 label: 'first temp day',
    //                 backgroundColor: '#16a86e',
    //                 data: first_temp_day.value
    //             },
    //             {
    //                 label: 'second temp day',
    //                 backgroundColor: '#afaa2c',
    //                 data: second_temp_day.value
    //             },
    //             {
    //                 label: 'first temp night',
    //                 backgroundColor: '#b42752',
    //                 data: first_temp_night.value
    //             },
    //             {
    //                 label: 'second temp night',
    //                 backgroundColor: '#da42f6',
    //                 data: second_temp_night.value
    //             }
    //         ]
    //     }
    //
    // })
    return {
        temp_value_chart,
        city_1,
        city_2,
        city_1_data_obj,
        city_2_data_obj,
        search_city,
        weekday,
        temp_mix_chart,
    }
})

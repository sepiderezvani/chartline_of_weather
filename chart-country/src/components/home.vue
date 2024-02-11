<template>
  <v-container style="width: 800px;height: auto;position:relative;top: -20px;left: 200px">
    <v-row class="v-col-12 mx-auto" style="border: 4px solid #5484a8">
      <v-col class="v-col-12">
        <input-search/>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="v-col-6">
        <LineChart :dataset="chart_1_data" v-if="show_chart_1"/>
      </v-col>
      <v-col class="v-col-6">
        <LineChart :dataset="chart_2_data" v-if="show_chart_2"/>
      </v-col>
    </v-row>
<v-row>
 <v-col class="v-col-1">
   <v-btn @click="toggleChart">
     mix
   </v-btn>
 </v-col>
  <v-col class="v-col-11">
    <LineChart :dataset="chart_mix_data" v-if="show_chart_mix"/>
  </v-col>
</v-row>
  </v-container>
  <router-view/>
</template>
<script setup>

import LineChart from '@/components/LineChart.vue'
import {useChartStore} from "@/store/chartStore.js";

const chartStore = useChartStore()
import {ref, toRefs, watch} from "vue";
import InputSearch from "@/components/inputSearch.vue";

const { temp_value_chart, city_1_data_obj, city_2_data_obj,temp_mix_chart} = toRefs(chartStore)

const chart_1_data = ref({})
const show_chart_1 = ref(false)

watch(city_1_data_obj, (n, o) => {
  show_chart_1.value = false
  chart_1_data.value = temp_value_chart.value(n)
  show_chart_1.value = true
})

const chart_2_data = ref({})
const show_chart_2 = ref(false)

watch(city_2_data_obj, (n, o) => {
  show_chart_2.value = false
  chart_2_data.value = temp_value_chart.value(n)
  show_chart_2.value = true
})
const chart_mix_data =ref({
  labels :[],
  datasets :[]
})
const show_chart_mix = ref(false)

watch([city_1_data_obj, city_2_data_obj], ([newCity1, newCity2], [oldCity1, oldCity2]) => {
  show_chart_mix.value = false;
  chart_mix_data.value = temp_mix_chart.value(newCity1, newCity2);
  console.log(chart_mix_data.value)
  // show_chart_mix.value =true;
},{deep : true});

function toggleChart(){
  show_chart_mix.value  = !show_chart_mix.value
}
</script>

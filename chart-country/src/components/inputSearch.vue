<template>
  <v-row>
    <v-col>
      <v-form>
        <input
            type="text"
            v-model="city_1"
            class=""
            placeholder="enter first city">
        <v-btn style="background-color:#4f779a;color: white" class="btn" @click="call_api_1" size="small"
               density="comfortable" rounded="md" append-icon="">
          get data
        </v-btn>
      </v-form>
    </v-col>
    <v-col>
      <v-form>
        <input
            type="text"
            v-model="city_2"
            class=""
            placeholder="enter first city">
        <v-btn style="background-color:#4f779a;color: white" class="btn" @click="call_api_2" size="small"
               density="comfortable" rounded="md" append-icon="">
          get data
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>
<script setup>
import {useChartStore} from "@/store/chartStore.js";
import {toRefs} from "vue";

const chartStore = useChartStore()
const {city_1, city_2, city_1_data_obj, city_2_data_obj} = toRefs(chartStore)
const {search_first_country, search_city} = chartStore

async function call_api_1() {
  city_1_data_obj.value = await search_city(city_1)
}

async function call_api_2() {
  city_2_data_obj.value = await search_city(city_2)
}
</script>
<style>
input {
  box-shadow: 1px 2px 5px #2c3e50;
  padding: 2px 8px;
}

.btn {
  margin-left: 15px;
}

input::placeholder {
  color: #1e3242;
  font-weight: bold;
}
</style>

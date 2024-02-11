<template>
  <Line :data="props.dataset" :options="chartOptions"/>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {Line} from 'vue-chartjs'

const props = defineProps(['dataset'])

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const chartOptions = {
  lineTension: 1,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          padding: 25
        }
      }
    ]
  }
}
</script>

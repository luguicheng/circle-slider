<template>
  <div id="App">
    <vue-circle-slider
      :max="max"
      :step-minutes="stepMinutes"
      @input="onChange"
    ></vue-circle-slider>
  </div>
</template>

<script>
  export default {
    name: 'circle-slider',
    data() {
      return {
        initialValue: '22:00-02:00', // '22:30-06:30',  [23, 8]
        stepMinutes: 60 // 间隔的分钟数
      }
    },
    computed: {
      max() {
        // 一天总分钟数
        const totalMinutes = 24 * 60
        let value = totalMinutes / this.stepMinutes
        return value
      }
    },
    methods: {
      onChange(val) {
        // console.log('value', val)
      }
    }
  }
</script>

<style scoped></style>

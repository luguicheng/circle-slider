<template>
  <div class="circle-slider">
    <slider :value="initialValue" :max="max" @input="onChange" :stepMinutes="stepMinutes" :side="120"></slider>
  </div>
</template>

<script>
import Slider from './slider.vue'

export default {
  name: 'circle-slider',
  components: {
    Slider
  },
  props: {},
  data() {
    return {
      initialValue: '22:00-02:00', // '22:30-06:30',  [23, 8]
      stepMinutes: 5 // 间隔的分钟数
    }
  },
  mounted() {
  },
  computed: {
    max() {
      // 一天总分钟数
      const totalMinutes = 24 * 60
      let value = totalMinutes / this.stepMinutes
      return value
    }
  },
  created() {},
  beforeDestroy() {},
  methods: {
    onChange(val) {
      // console.log('value', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.circle-slider {
  padding: 100px;
}
</style>

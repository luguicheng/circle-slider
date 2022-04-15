# 简介
一个用于圆形滑块的 Vue 组件

A Vue component for a circular slider

# 示例
<img width="124" alt="截屏2022-04-15 21 23 23" src="https://user-images.githubusercontent.com/50764950/163575986-dd942d48-ca63-43dd-8f3e-7407b641a87a.png">

[👉 点我查看示例](https://luguicheng.github.io/circle-slider/dist/index.html)


# 使用

## 安装
```javascript
npm i @luguicheng/vue-circle-slider
```
## 注册组件
```javascript
import vueCircleSlider from '@luguicheng/vue-circle-slider'
Vue.use(vueCircleSlider)
```

```javascript
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
        stepMinutes: 5 // 间隔的分钟数
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
        console.log('value', val)
      }
    }
  }
</script>
```


# 配置

|属性|类型|默认值|描述|
|---|---|---|---|
|value|Array,String|22:00-02:00|默认值|
|stepMinutes|Number|30|每一步的分钟数|
|side|	Number|	100|	svg 正方形边的大小（以 px 为单位）|
|min	|Number|	0	|最小值|
|max	|Number	|100|	最大值|
|stepSize	|Number|	1|	值之间的差距|
|circleColor	|String|	#334860	|最外层圆的颜色|
|progressColor|	String|	#00be7e|	进度曲线的颜色|
|knobColorStart|String|#00be7e|开始旋钮的颜色|
|knobColor|	String|	#00be7e	|结束旋钮颜色|
|knobRadius	|Number|	null|	精确的旋钮半径（以 px 为单位）|
|knobRadiusRel|	Number	|7	|相对旋钮半径。 以 px 为单位的半径值将计算为 (side/2) /knobRadiusRel|
|circleWidth|	Number|	null	|圆的精确宽度（以 px 为单位）|
|circleWidthRel	|Number|	20|	相对圆的宽度。 以 px 为单位的宽度值将计算为 (side/2) / circleWidthRel|
|progressWidth	|Number	|null|	精确的进度曲线宽度（以 px 为单位）|
|progressWidthRel|	Number	|10|	相对进度曲线宽度。 以 px 为单位的宽度值将计算为 (side/2) / progressWidthRel|

# 事件
|名称|描述|
|---|---|
|value|值改变时会触发 value 事件|


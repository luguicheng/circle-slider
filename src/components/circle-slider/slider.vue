<template>
  <div>
    <svg
      :width="side + 'px'"
      :height="side + 'px'"
      :viewBox="'0 0 ' + side + ' ' + side"
      ref="_svg"
      @dblclick="init([0, max])"
      @mouseup="handleSvgMouseup"
      @mousewheel="handleMousewheel"
      :style="{ cursor: pathCursor === 'grabbing' ? 'grabbing' : 'default' }"
    >
      <circle
        :stroke="circleColor"
        fill="none"
        :stroke-width="cpMainCircleStrokeWidth"
        :cx="cpCenter"
        :cy="cpCenter"
        :r="radius"
        ref="_circle"
      ></circle>
      <text
        :x="side / 2 - 31"
        :y="side / 2 - 8"
        fill="#555"
        style="font-size: 16px; user-select: none"
      >
        起 {{ sliderTime.split('-')[0] }}
      </text>
      <text
        :x="side / 2 - 31"
        :y="side / 2 + 13"
        fill="#555"
        style="font-size: 16px; user-select: none"
      >
        止 {{ sliderTime.split('-')[1] }}
      </text>
      <line
        :x1="side / 2 - 2"
        :y1="line.y1"
        :x2="side / 2 - 2"
        :y2="line.y2"
        style="stroke: #ccc; stroke-width: 2"
      />

      <path
        ref="_path"
        :stroke="progressColor"
        fill="none"
        :style="{ cursor: pathCursor }"
        :stroke-width="cpPathStrokeWidth"
        :d="cpPathD"
        @mousedown="pathMousedown"
        @mouseup="pathMouseup"
      ></path>

      <circle
        style="cursor: move"
        title="开始时间"
        @touchmove="(e) => handleTouchMove(e, 'start')"
        @mousedown="(e) => handleMouseDown(e, 'start')"
        @mouseup="handleMouseUp"
        :fill="knobColorStart"
        :r="cpKnobRadius"
        :cx="cpPathXStart"
        :cy="cpPathYStart"
        data-pos="start"
      ></circle>

      <circle
        style="cursor: move"
        title="结束时间"
        @touchmove="(e) => handleTouchMove(e, 'end')"
        @mousedown="(e) => handleMouseDown(e, 'end')"
        @mouseup="handleMouseUp"
        :fill="knobColor"
        :r="cpKnobRadius"
        :cx="cpPathX"
        :cy="cpPathY"
        data-pos="end"
      ></circle>
    </svg>
  </div>
</template>
<script>
  import TouchPosition from './touch_position.js'
  import CircleSliderState from './circle_slider_state.js'
  export default {
    name: 'RoundSlider',
    props: {
      startAngleOffset: {
        type: Number,
        required: false,
        default: function () {
          // return Math.PI
          return 0
        }
      },
      value: {
        type: [Array, String],
        required: false,
        default() {
          return '22:00-06:00'
        }
      },
      side: {
        type: Number,
        required: false,
        default: 100
      },
      stepSize: {
        type: Number,
        required: false,
        default: 1
      },
      min: {
        type: Number,
        required: false,
        default: 0
      },
      max: {
        type: Number,
        required: false,
        default: 24
      },
      circleColor: {
        type: String,
        required: false,
        default: '#ccc'
      },
      progressColor: {
        type: String,
        required: false,
        default: '#00be7e'
      },
      knobColor: {
        type: String,
        required: false,
        default: '#be7e00'
      },
      knobColorStart: {
        type: String,
        required: false,
        default: '#00be7e'
      },
      // 起止圆点的半径
      knobRadius: {
        type: Number,
        required: false,
        default: null
      },
      knobRadiusRel: {
        type: Number,
        required: false,
        default: 7
      },
      circleWidth: {
        type: Number,
        required: false,
        default: null
      },
      circleWidthRel: {
        type: Number,
        required: false,
        default: 20
      },
      progressWidth: {
        type: Number,
        required: false,
        default: null
      },
      progressWidthRel: {
        type: Number,
        required: false,
        default: 10
      },
      stepMinutes: {
        type: Number,
        required: false,
        default: 60
      }
      // limitMin: {
      //   type: Number,
      //   required: false,
      //   default: null
      // },
      // limitMax: {
      //   type: Number,
      //   required: false,
      //   default: null
      // }
    },
    data() {
      return {
        pathCursor: 'grab',
        moving: null,
        line: {
          y1: this.side - 14,
          y2: this.side - 6
        },
        sliderTime: '',
        steps: null,
        stepsCount: null,
        radius: 0,
        angle: 0,
        angleStart: 0,
        currentStepValue: 0,
        currentStepStartValue: 0,
        mousePressed: false,
        circleSliderState: null,
        mousemoveTicks: 0,
        pos: '',
        touchPosition: null,
        isShiftPress: false,
        startDelta: 0,
        endDelta: 0,
        startX: 0,
        startY: 0
      }
    },
    computed: {
      // cpStartAngleOffset () {
      //   if (!this.minStepLimit) {
      //     return 0
      //   }
      // },
      cpCenter() {
        return this.side / 2
      },
      // 结束弧度
      cpAngle() {
        return this.angle + Math.PI / 2
        // return this.angle - Math.PI / 2
      },
      // 开始弧度
      cpAngleStart() {
        return this.angleStart + Math.PI / 2
        // return this.angleStart - Math.PI / 2
      },
      cpMainCircleStrokeWidth() {
        return this.circleWidth || this.side / 2 / this.circleWidthRel
      },
      cpPathDirection() {
        // 大弧标志。它只是确定圆弧应该大于还是小于 180 度；最后，这个标志决定了弧将围绕给定圆的哪个方向。
        let largeArc = 1
        // 开始大于结束
        if (this.cpAngleStart > this.cpAngle) {
          // 大于 Math.PI
          if (this.cpAngleStart - this.cpAngle < Math.PI) {
            largeArc = 1
          } else {
            largeArc = 0
          }
        } else {
          largeArc = this.cpAngle - this.cpAngleStart < Math.PI ? 0 : 1
        }
        return largeArc
      },
      cpPathDirectionStart() {
        return this.cpAngle < (3 / 2) * Math.PI ? 0 : 1
      },
      cpPathX() {
        return this.cpCenter + this.radius * Math.cos(this.cpAngle)
      },
      cpPathY() {
        return this.cpCenter + this.radius * Math.sin(this.cpAngle)
      },
      cpPathXStart() {
        return this.cpCenter + this.radius * Math.cos(this.cpAngleStart)
      },
      cpPathYStart() {
        return this.cpCenter + this.radius * Math.sin(this.cpAngleStart)
      },

      cpPathStrokeWidth() {
        return this.progressWidth || this.side / 2 / this.progressWidthRel
      },
      cpKnobRadius() {
        return this.knobRadius || this.side / 2 / this.knobRadiusRel
      },
      cpPathD() {
        let parts = []
        parts.push('M' + this.cpPathXStart)
        parts.push(this.cpPathYStart)
        parts.push('A')
        parts.push(this.radius)
        parts.push(this.radius)

        // 是椭圆相对于坐标系的旋转角度，角度数而非弧度数。
        parts.push(0)

        // 大弧标志。它只是确定圆弧应该大于还是小于 180 度；最后，这个标志决定了弧将围绕给定圆的哪个方向。
        // 1大弧 0小弧
        parts.push(this.cpPathDirection)

        // 扫描标志。它确定弧线应该以负角还是正角开始移动，这基本上选择了您将绕行的两个圆中的哪一个。
        // 1顺时针 0逆时针
        parts.push(1)

        let cpPathX = this.cpPathX
        let cpPathY = this.cpPathY

        // 处理开始和结束 00:00-24:00 圆弧绘制问题
        if (
          this.currentStepStartValue == 0 &&
          this.currentStepValue == this.max
        ) {
          cpPathX = Math.ceil(this.cpPathX)
        }

        parts.push(cpPathX)
        parts.push(cpPathY)
        return parts.join(' ')
      }
    },
    watch: {
      value: {
        handler(val) {
          let value = val
          value = this.stringToArray(val)
          this.updateFromPropValue(value)
        },
        immediate: true
      }
    },
    created() {
      this.stepsCount = 1 + (this.max - this.min) / this.stepSize
      this.steps = Array.from(
        {
          length: this.stepsCount
        },
        (_, i) => this.min + i * this.stepSize
      )
      this.init(this.value)
      this.eventListener()
      window.addEventListener('mouseup', () => {
        this.moving = false
      })
    },
    mounted() {
      const n = this.cpKnobRadius
      const sliderTolerance =
        n < this.cpPathStrokeWidth ? this.cpPathStrokeWidth : n
      this.touchPosition = new TouchPosition(
        this.$refs._svg,
        this.radius,
        sliderTolerance
      )
      this.setFlagPosition()
    },
    beforeDestroy() {
      this.removeKeyboardListener()
    },
    methods: {
      init(value) {
        const sliderValue = this.stringToArray(value)
        this.circleSliderState = new CircleSliderState(
          this.steps,
          this.startAngleOffset,
          sliderValue
        )
        this.angle = this.circleSliderState.angleValue
        this.angleStart = this.circleSliderState.angleStartValue
        this.currentStepStartValue = this.circleSliderState.currentStepStart
        this.currentStepValue = this.circleSliderState.currentStep
        let maxCurveWidth = Math.max(
          this.cpMainCircleStrokeWidth,
          this.cpPathStrokeWidth
        )
        this.radius =
          this.side / 2 - Math.max(maxCurveWidth, this.cpKnobRadius * 2) / 2
        this.updateFromPropValue(sliderValue)
      },
      initMoving() {
        this.moving = null
      },
      pathMousedown(e) {
        this.startX = e.x
        this.startY = e.y
        this.pathCursor = 'grabbing'
        this.touchPosition.setNewPosition(e)
        let currentAngle = this.touchPosition.sliderAngle

        this.startDelta = currentAngle - this.angleStart
        this.endDelta = this.angle - currentAngle

        this.initMoving()

        // 开始大于结束
        if (this.angleStart > this.angle) {
          if (currentAngle <= Math.PI) {
            this.startDelta = currentAngle + (2 * Math.PI - this.angleStart)
          } else {
            this.endDelta = this.angle + (2 * Math.PI - currentAngle)
          }
        }

        window.addEventListener('mousemove', this.handlePathMousemove)
        window.addEventListener('mouseup', this.handlePathMouseup)
      },
      pathMouseup() {
        window.removeEventListener('mousemove', this.handlePathMousemove)
        window.removeEventListener('mouseup', this.handlePathMouseup)
      },
      handlePathMousemove(e) {
        if (this.moving === false) {
          return
        }

        if (this.startX === e.x && this.startY === e.y) {
          return
        }
        this.moving = true

        this.touchPosition.setNewPosition(e)
        const newAngle = this.touchPosition.sliderAngle

        let angleStart = newAngle - this.startDelta
        let angle = newAngle + this.endDelta

        if (angleStart <= 0) {
          angleStart = 2 * Math.PI - (this.startDelta - newAngle)
        }

        if (angle >= 2 * Math.PI) {
          angle = this.endDelta - (2 * Math.PI - newAngle)
        }

        this.moveSlider(angleStart, angle)
      },
      handlePathMouseup(e) {
        this.pathCursor = 'grab'
      },
      moveSlider(startAngle, endAngle) {
        const animate = () => {
          this.pos = 'start'
          this.updateAngle(startAngle)

          this.$nextTick(() => {
            this.pos = 'end'
            this.updateAngle(endAngle)
          })
        }
        window.requestAnimationFrame(animate)
      },
      setFlagPosition() {
        const circle = this.$refs._circle.getBoundingClientRect()
        const minStrokeWidth = this.cpKnobRadius
        const strokeWidth =
          this.cpMainCircleStrokeWidth < minStrokeWidth
            ? minStrokeWidth
            : this.cpMainCircleStrokeWidth
        this.line.y1 =
          circle.height + (this.side - this.radius * 2) / 2 - strokeWidth
        this.line.y2 = circle.height + (this.side - this.radius * 2) / 2
      },
      removeKeyboardListener() {
        window.removeEventListener('keydown', this.keydownListener)
        window.removeEventListener('keyup', this.keyupListener)
      },
      eventListener() {
        window.addEventListener('keydown', this.keydownListener)
        window.addEventListener('keyup', this.keyupListener)
      },
      keydownListener(e) {
        console.log(e.key)
        if (e.key == 'Shift') {
          this.isShiftPress = true
        }
      },
      keyupListener(e) {
        if (e.key == 'Shift') {
          this.isShiftPress = false
        }
      },
      // string parse to Array
      // 22:30-06:30 -> [start, end]
      stringToArray(value) {
        let ret = value
        if (typeof ret === 'string') {
          let arr = value.split('-')
          let start = arr[0]
          let end = arr[1]
          // 转为分钟
          const sArr = start.split(':')
          const eArr = end.split(':')
          const startMinutes = Number(sArr[0]) * 60 + Number(sArr[1])
          const endMinutes = Number(eArr[0]) * 60 + Number(eArr[1])

          // 转为组件显示的值
          const startValue = startMinutes / this.stepMinutes
          const endValue = endMinutes / this.stepMinutes
          ret = [startValue, endValue]
        }

        // 转为组件显示的数值
        return ret
      },
      // Array parse to string
      // [start, end] -> 22:30-06:30
      arrayToString(value) {
        let ret = ''
        const startValue = value[0] * this.stepMinutes
        // 避免 stepMinutes 太小导致无法显示 24:00 问题
        const end = value[1] || this.max
        const endValue = end * this.stepMinutes
        const startTime =
          Math.floor(startValue / 60)
            .toString()
            .padStart(2, 0) +
          ':' +
          (startValue % 60).toString().padStart(2, 0)
        const endTime =
          Math.floor(endValue / 60)
            .toString()
            .padStart(2, 0) +
          ':' +
          (endValue % 60).toString().padStart(2, 0)
        ret = startTime + '-' + endTime
        return ret
      },
      getValue() {
        const value = [
          this.circleSliderState.firstStep,
          this.circleSliderState.lastStep
        ]
        const ret = this.arrayToString(value)
        this.sliderTime = ret.toString()
        return ret
      },
      /*
       */
      fitToStep(val) {
        return Math.round(val / this.stepSize) * this.stepSize
      },
      handleMousewheel(e) {
        // 改变结束位置
        this.pos = 'end'

        // 同时按下 Shift, 则改变开始位置
        if (this.isShiftPress) {
          this.pos = 'start'
        }

        const delta = Math.sign(e.deltaY)
        // 每一步的弧度
        const angleUnit = (delta * (2 * Math.PI)) / this.max
        let angleValue = this.circleSliderState.angleValue

        if (this.isShiftPress) {
          angleValue = this.circleSliderState.angleStartValue
        }

        // 处理 0 弧度时的边界情况
        if (angleValue == -0.00001) {
          angleValue = 2 * Math.PI
        }
        if (angleValue == 2 * Math.PI - 0.00001) {
          angleValue = 0.00001
        }
        const angle = angleValue - angleUnit
        this.updateAngle(angle)
      },
      /*
       */
      handleSvgMouseup(e) {
        this.pathCursor = 'grab'

        if (this.moving) {
          this.moving = false
          return
        }

        this.touchPosition.setNewPosition(e)
        if (this.touchPosition.isTouchWithinSliderRange) {
          const newAngle = this.touchPosition.sliderAngle
          // 决定 animateSlider方法中 updateAngle 修改是哪个位置（开始/结束）
          this.pos = 'end'
          let startValue = this.angle
          if (this.isShiftPress) {
            this.pos = 'start'
            startValue = this.angleStart
          }

          this.animateSlider(startValue, newAngle)
        }
      },
      /*
       */
      handleMouseDown(e, pos) {
        this.pos = pos
        e.preventDefault()
        e.stopPropagation()
        this.mousePressed = true
        window.addEventListener('mousemove', this.handleWindowMouseMove)
        window.addEventListener('mouseup', this.handleMouseUp)
        return false
      },
      /*
       */
      handleMouseUp(e) {
        this.pos = ''
        e.preventDefault()
        e.stopPropagation()
        this.mousePressed = false
        window.removeEventListener('mousemove', this.handleWindowMouseMove)
        window.removeEventListener('mouseup', this.handleMouseUp)

        this.mousemoveTicks = 0
        return false
      },
      /*
       */
      handleTouchMove(e, pos) {
        this.pos = pos
        this.$emit('touchmove')
        // Do nothing if two or more fingers used
        if (
          e.targetTouches.length > 1 ||
          e.changedTouches.length > 1 ||
          e.touches.length > 1
        ) {
          return true
        }
        const lastTouch = e.targetTouches.item(e.targetTouches.length - 1)
        this.touchPosition.setNewPosition(lastTouch)
        if (this.touchPosition.isTouchWithinSliderRange) {
          e.preventDefault()
          this.updateSlider()
        }
      },
      /*
       */
      handleWindowMouseMove(e) {
        if (!this.mousePressed) {
          return
        }
        e.preventDefault()
        // if (this.mousemoveTicks < 5) {
        //   this.mousemoveTicks++
        //   return
        // }
        this.touchPosition.setNewPosition(e)
        this.updateSlider()
      },
      /*
       */
      updateAngle(angle) {
        // 避免 stepMinutes 太小导致无法绘制 00:00 - 24:00 弧线问题
        if (angle == 0 && this.pos == 'end') {
          this.circleSliderState.updateCurrentStepFromAngle(
            2 * Math.PI,
            this.pos
          )
        } else {
          this.circleSliderState.updateCurrentStepFromAngle(angle, this.pos)
        }
        if (this.pos == 'start') {
          this.angleStart = this.circleSliderState.angleStartValue
        }

        if (this.pos == 'end') {
          this.angle = this.circleSliderState.angleValue
        }

        this.currentStepValue = this.circleSliderState.currentStep
        this.currentStepStartValue = this.circleSliderState.currentStepStart

        const ret = this.getValue()
        this.$emit('input', ret)
      },
      /*
       */
      updateFromPropValue(value) {
        this.$nextTick(() => {
          let firstStepValue = this.fitToStep(value[0])
          this.circleSliderState.updateCurrentStepFromValue(
            firstStepValue,
            'start'
          )
          let lastStepValue = this.fitToStep(value[1])
          this.circleSliderState.updateCurrentStepFromValue(
            lastStepValue,
            'end'
          )

          this.angleStart = this.circleSliderState.angleStartValue
          this.angle = this.circleSliderState.angleValue

          this.currentStepStartValue = firstStepValue
          this.currentStepValue = lastStepValue

          const ret = this.getValue()
          this.$emit('input', ret)
        })
      },
      /*
       */
      updateSlider() {
        const angle = this.touchPosition.sliderAngle
        // if (Math.abs(angle - this.angle) < Math.PI) {
        //   this.updateAngle(angle)
        // }

        this.updateAngle(angle)
      },
      /*
       */
      animateSlider(startAngle, endAngle, direction) {
        // 只需计算一次即可
        if (!direction) {
          let angleValue = this.angle
          if (this.pos === 'start') {
            angleValue = this.angleStart
          }
          // 顺时针的路径弧度
          let offsetClockwise = endAngle - angleValue

          if (endAngle < angleValue) {
            offsetClockwise = endAngle + (2 * Math.PI - angleValue)
          }

          // 根据最短路径选择顺时针还是逆时针
          // 顺时针弧度小于Math.PI, 就选择 顺时针，反之选择逆时针
          direction = offsetClockwise < Math.PI ? 1 : -1
        }

        const curveAngleMovementUnit =
          direction * this.circleSliderState.angleUnit * 2
        const animate = () => {
          if (
            Math.abs(endAngle - startAngle) <
            Math.abs(2 * curveAngleMovementUnit)
          ) {
            this.updateAngle(endAngle)
          } else {
            let startValue = this.angle
            if (this.pos === 'start') {
              startValue = this.angleStart
            }

            let newAngle = startAngle + curveAngleMovementUnit

            // 处理 弧度为0 或 2 * Math.PI 时的边界情况
            if (direction == -1) {
              if (startValue == -0.00001) {
                newAngle = 2 * Math.PI
              }
            }
            if (direction === 1) {
              if (startValue == 2 * Math.PI - 0.00001) {
                newAngle = 0.00001
              }
            }
            this.updateAngle(newAngle)
            this.animateSlider(newAngle, endAngle, direction)
          }
        }

        window.requestAnimationFrame(animate)
      }
    }
  }
</script>

export default class CircleSliderState {
  /*
   */
  constructor(steps, offset, initialValue) {
    this.steps = steps
    this.offset = offset
    this.currentStepStartIndex = 0
    this.currentStepIndex = 0

    this.length = this.steps.length - 1

    if (initialValue.length) {
      this.firstStep = initialValue[0]
      this.lastStep = initialValue[1]
      this.currentStepStartIndex = this.steps.findIndex(
        step => step === initialValue[0]
      )
      this.currentStepIndex = this.steps.findIndex(
        step => step === initialValue[1]
      )
    }
  }

  /*
   */
  get angleUnit() {
    return (Math.PI * 2 - this.offset) / this.length
  }
  /*
   */
  get angleValue() {
    return (
      Math.min(
        this.offset + this.angleUnit * this.currentStepIndex,
        Math.PI * 2 - Number.EPSILON
      ) - 0.00001
    ) // correct for 100% value
  }

  get angleStartValue() {
    return (
      Math.min(
        this.offset + this.angleUnit * this.currentStepStartIndex,
        Math.PI * 2 - Number.EPSILON
      ) - 0.00001
    ) // correct for 100% value
  }

  /*
   */
  get currentStep() {
    return this.steps[this.currentStepIndex]
  }

  get currentStepStart() {
    return this.steps[this.currentStepStartIndex]
  }

  /*
   */
  updateCurrentStepFromValue(value, pos) {
    for (let i = 0; i < this.length; i++) {
      if (value <= this.steps[i]) {
        if (pos == 'start') {
          this.firstStep = value
          this.currentStepStartIndex = i
        }
        if (pos == 'end') {
          this.lastStep = value
          this.currentStepIndex = i
        }
        return
      }
    }

    // this.currentStepIndex = this.length
  }

  /*
   */
  updateCurrentStepFromAngle(angle, pos) {
    const stepIndex = Math.round((angle - this.offset) / this.angleUnit)

    if (pos == 'start') {
      this.currentStepStartIndex = Math.min(Math.max(stepIndex, 0), this.length)
      this.firstStep = this.steps[this.currentStepStartIndex]
    }

    if (pos == 'end') {
      this.currentStepIndex = Math.min(Math.max(stepIndex, 0), this.length)
      this.lastStep = this.steps[this.currentStepIndex]
    }
  }
}

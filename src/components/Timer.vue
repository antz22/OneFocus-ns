<template>
  <Label class="header2" :text="formattedTimeLeft"/>
</template>

<script>

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

export default {
  name: 'Timer',
  props: {
    timeLeft: {
      type: Number,
      required: true
    },
    timeLimit: {
      type: Number,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    alertThreshold: {
      type: Number,
      default: 5
     },    
    warningThreshold: {
      type: Number,
      default: 10
    },
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft   
      const hours = Math.floor(timeLeft / 3600)    
      let minutes = Math.floor((timeLeft % 3600)/60) 
      let seconds = timeLeft % 60
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      if (hours == 0) {
        return `${minutes}:${seconds}`
      } else {
        if (hours < 0 || minutes < 0) {
          this.$emit('timerDone')
          return `00:00`
        } else {
          return `${hours}:${minutes}.${seconds}`
        }
      }
    },
    // Update the dasharray value as time passes, starting with 283
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit
      
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
    },
    colorCodes() {
      return {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: this.warningThreshold
        },
        alert: {
          color: "red",
          threshold: this.alertThreshold
        }
      }
    },
    remainingPathColor() {
      const { alert, warning, info } = this.colorCodes
      if (this.timeLeft <= alert.threshold) {
        return alert.color
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color
      } else {
        return info.color
      }
    },
  }
}
</script>

<style>

</style>
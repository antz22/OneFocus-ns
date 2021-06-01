<template>
  <!-- <Label class="header2" :text="formattedTimeLeft"/> -->

    <GridLayout>
      <RadRadialGauge class="gauge">
        <RadialScale ref="myScale" v-tkRadialGaugeScales startAngle="0" sweepAngle="360" minimum="0" maximum="100" radius="0.9">
          <ScaleStyle v-tkRadialScaleStyle ticksVisible="false" labelsVisible="false" lineThickness="0"></ScaleStyle>

          <!-- <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="100" location="0.5">
            <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="rgba(224,151,36,0.5)" barWidth="0.2"></BarIndicatorStyle>
          </RadialBarIndicator>

          <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="0" location="0.5" isAnimated="true">
            <BarIndicatorStyle v-tkRadialBarIndicatorStyle cap="Round" fillColor="rgba(224,151,36,1)" barWidth="0.2"></BarIndicatorStyle>
          </RadialBarIndicator> -->

          <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="100" location="0.75">
            <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="rgba(196,241,57,0.5)" barWidth="0.2"></BarIndicatorStyle>
          </RadialBarIndicator>

          <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" :maximum="test" location="0.75" isAnimated="true">
            <BarIndicatorStyle v-tkRadialBarIndicatorStyle cap="Round" fillColor="rgba(196,241,57,1)" barWidth="0.2"></BarIndicatorStyle>
          </RadialBarIndicator>

          <!-- <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="100" location="1">
            <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="rgba(132,235,247,0.5)" barWidth="0.2"></BarIndicatorStyle>
          </RadialBarIndicator>

          <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="0" location="1" isAnimated="true">
            <BarIndicatorStyle v-tkRadialBarIndicatorStyle cap="Round" fillColor="rgba(132,235,247,1)" barWidth="0.2"></BarIndicatorStyle>
          </RadialBarIndicator> -->
        </RadialScale>
      </RadRadialGauge>.
      <Label :text="formattedTimeLeft" :color="textColor" :fontSize="textSize" class="m-x-auto m-y-auto" :marginTop="offset"></Label>
    </GridLayout>


	<!-- <GridLayout :height="height" :width="height">
		<RadRadialGauge>
			<RadialScale v-tkRadialGaugeScales startAngle="-90" sweepAngle="360">
				<ScaleStyle v-tkRadialScaleStyle ticksVisible="false" labelsVisible="false" lineThickness="0">
				</ScaleStyle>

				<RadialBarIndicator v-tkRadialScaleIndicators minimum="0" :maximum="value">
					<BarIndicatorStyle v-tkRadialBarIndicatorStyle :fillColor="fillColor" cap="Round" barWidth="0.1">
					</BarIndicatorStyle>
				</RadialBarIndicator>

				<RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="100">
					<BarIndicatorStyle v-tkRadialBarIndicatorStyle :fillColor="fillBackgroundColor" cap="Round" barWidth="0.1">
					</BarIndicatorStyle>
				</RadialBarIndicator>

        <RadialNeedle v-tkRadialScaleIndicators isAnimated="true" animatedDuration="500">
          <NeedleStyle v-tkRadialNeedleStyle length="0.8" />
        </RadialNeedle>

			</RadialScale>
		</RadRadialGauge>
	</GridLayout> -->
</template>

<script>

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

export default {
  name: 'Timer',
  data() {
    return {
      value: 0,
    }
  },
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

    size: { default: 100 },
    progress: { default: 0 },
    offset: { default: 0 },
    textColor: { default: "#bfbfc4" },
    fillColor: { default: "#FDA458" },
    fillBackgroundColor: { default: "#efeff4" }
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


    height() {
      return Math.min(this.size, 250);
    },
    value() {
      // console.log(this.timeLeft, this.timeLimit)
      // console.log(Math.min(parseInt(this.timeLeft/this.timeLimit*100), 100))
      return Math.min(parseInt(this.timeLeft/this.timeLimit*100), 100);
    },
    text() {
      return `${this.value.toFixed()}%`;
    },
    textSize() {
      return this.height / 3.5;
    }
  }
}
</script>

<style scoped>

.gauge {
  width: 400;
  height: 400;
}
</style>
<template>
  <Page>
    <ScrollView>
      <StackLayout orientation="vertical">

        <GridLayout>
          <Timer :timeLeft="timeLeft" :timeLimit="timeLimit" @timerDone="pauseTimer(); playAlarm();"/>
        </GridLayout>

        <!-- <Timer :small="true" :timeLeft="breakTimeLeft" :timeLimit="breakTimeLimit" @timerDone="resetTimer(); playAlarm();"/> -->

        <GridLayout rows="auto,auto,auto" cols="auto,auto,auto">
          <Label v-if="hours == 0 && mins == 0" text="Input a time for a focus session:" row="0" col="0" horizontalAlignment="center"/>
          <Button v-if="!timerOn && (hours > 0 || mins > 0)" @tap="timerOn = !timerOn; startTimer();" text="Start" row="0" col="0"/>
          <Button v-if="timerOn" @tap="timerOn = !timerOn; resetTimer();" text="Reset" row="0" col="1"/>

          <Button v-if="showPaused && !paused" @tap="pauseTimer" text="Pause" row="1" col="1"/>
          <Button v-if="showPaused && paused" @tap="startTimer" text="Resume" row="1" col="1"/>

          <Button v-if="breakTimerOn" text="Start Break?" @tap="breakStartTimer" row="2" col="0"/>
        </GridLayout>

        <GridLayout v-if="!timerOn" rows="auto,auto,auto,auto,auto,auto" cols="auto,auto">

          <Label text="Hours" row="0" col="0" horizontalAlignment="center"/>
          <TextField keyboardType="number" class="num-input" v-model="hours" row="1" col="0" maxLength="2">
          </TextField>

          <Label text="Minutes" row="2" col="0" horizontalAlignment="center"/>
          <TextField keyboardType="number" class="num-input" v-model="mins" row="3" col="0" maxLength="2">
          </TextField>

          <Label text="Set a break timer (minutes)" row="4" col="0" horizontalAlignment="center"/>
          <TextField keyboardType="number" class="num-input" v-model="breakMins" row="5" col="0" maxLength="2">
          </TextField>

        </GridLayout>
      </StackLayout>

    </ScrollView>
  </Page>
</template>

<script>
import Vue from 'nativescript-vue'
import Timer from '../components/Timer'
import RadGauge from 'nativescript-ui-gauge/vue'

Vue.use(RadGauge)

export default {
  name: 'Pomodoro',
  components: {
    Timer,
  },
  data() {
    return {
      hours: 0,
      mins: 0,
      seconds: 0,
      timePassed: 0,
      timeLimit: 0,
      timerOn: false,
      timerInterval: null,

      breakMins: 0,
      breakSeconds: 0,
      breakTimePassed: 0,
      breakTimeLimit: 0,
      breakTimerOn: false,
      breakTimerInterval: null,

      paused: false,
      showPaused: false,
    }
  },
  methods: {
    startTimer() {
      this.timeLimit = 3600*this.hours + 60*this.mins
      this.timerInterval = setInterval(() => {
        this.timePassed += 1
      }, 1000)
      setTimeout(() => { clearInterval(this.timerInterval); this.breakTimerOn = true }, this.timeLimit*1000+1000)
      this.showPaused = true
      this.paused = false
    },
    pauseTimer() {
      clearInterval(this.timerInterval)
      this.paused = true
    },
    resetTimer() {
      clearInterval(this.timerInterval)
      this.timePassed = 0
      this.timerInterval = null
      clearInterval(this.breakTimerInterval)
      this.breakTimePassed = 0
      this.breakTimerInterval = null
      this.showPaused = false
      this.paused = false
    },
    breakStartTimer() {
      this.breakTimeLimit = 60*this.breakMins
      this.breakTimerInterval = setInterval(() => {
        this.breakTimePassed += 1
      }, 1000)
      setTimeout(() => { clearInterval(this.breakTimerInterval); this.breakTimerOn = false; this.timerOn = false; }, this.breakTimeLimit*1000+1000)
    },
    playAlarm() {
      alert('Time is up!')
      // var audio = new Audio(require('../assets/timer_alert.mp3'))
      // audio.play()
    }
  },
  computed: {
    timeLeft() {
      return 3600*this.hours + 60*this.mins - this.timePassed
    },
    breakTimeLeft() {
      return 60*this.breakMins - this.breakTimePassed
    }
  },
}
</script>

<style scoped>
.num-input {
  width: 30;
  text-align: center;

}

</style>
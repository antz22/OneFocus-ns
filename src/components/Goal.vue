<template>
  <!-- <Page> -->
    <!-- <ActionBar title="Create a Goal"/> -->

    <FlexboxLayout class="page">
      <StackLayout class="form">
        <!-- <Image class="logo" src="~/images/logo.png"></Image> -->
        <Label class="header" text="New Goal"></Label>

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField class="input" hint="What is your goal?" v-model="goal"
              returnKeyType="next"/>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField class="input" hint="What's the limit of what you want to measure your progress by?" v-model="progressLimit"
              returnKeyType="next"/>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" class="input-field">
            <TextField class="input" hint="Have you made any progress on this goal yet?" v-model="progress"
              returnKeyType="next"/>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button text="Create Goal" @tap="submitForm" class="btn btn-primary m-t-20"/>
      </StackLayout>

      <Label v-if="errors.length" >
        <FormattedString>
          <Span v-for="error in errors" :key="error" :text="error"></Span>
        </FormattedString>
      </Label>

    </FlexboxLayout>
    <!-- <label>(ex. 90 days, 10 homework assignments, etc)</label>

    <label>(ex. finished 5/10 assignments already)</label> -->
  <!-- </Page> -->

</template>


<script>
import axios from 'axios'

export default {
  name: 'Goal',
  data() {
    return {
      goal: '',
      progress: 0,
      progressLimit: 0,
      errors: [],

      processing: false,
    }
  },
  methods: {
    submitForm() {
      this.processing = true
      this.errors = []

      if (this.goal === '') {
        this.errors.push('Enter a goal')
      }

      if (!this.errors.length) {
        const formData = {
          goal: this.goal,
          time: this.time,
          progress: this.progress,
          progressLimit: this.progressLimit,
        }

        axios
          .post("/api/v1/create-goal/", formData)
          .then(response => {
            this.processing = false
            alert('Goal created.')

            this.$navigateTo(Home, {clearHistory: true})
            // this.$router.push('/')
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }

              console.log(JSON.stringify(error.response.data))

            } else if (error.message) {
              this.errors.push('Something went wrong. Please try again')

              console.log(JSON.stringify(error))
            }
          })
      }
    }
  }

}
</script>

<style>

</style>
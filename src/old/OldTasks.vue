<template>
  <!-- <Page> -->
    <!-- <ActionBar title="Create a Task"/> -->

    <FlexboxLayout class="page">
      <StackLayout class="form">
        <!-- <Image class="logo" src="~/images/logo.png"></Image> -->
        <Label class="header" text="New Task"></Label>

        <GridLayout rows="auto, auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField class="input" hint="What's the task?" v-model="content"
              returnKeyType="next"/>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField class="input" hint="What's the motivation? (optional)" v-model="motivation"
              returnKeyType="next"/>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" class="input-field">
            <TextField class="input" hint="How long will it take? (hours)" v-model.number="hours"
              returnKeyType="next"/>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="3" class="input-field">
            <TextField class="input" hint="How long will it take? (mins)" v-model.number="mins"
              returnKeyType="next"/>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button text="Create Task" @tap="submitForm" class="btn btn-primary m-t-20"/>
      </StackLayout>

      <Label v-if="errors.length" >
        <FormattedString>
          <Span v-for="error in errors" :key="error" :text="error"></Span>
        </FormattedString>
      </Label>

    </FlexboxLayout>
  <!-- </Page> -->
</template>

<script>
import axios from 'axios'
import Home from './Home'

export default {
  name: 'Tasks',
  data() {
    return {
      content: '',
      motivation: '',
      hours: 0,
      mins: 0,
      errors: [],

      processing: false,
    }
  },
  computed: {
    time() {
      return this.hours*60+this.mins
    },
  },
  methods: {
    submitForm() {
      this.processing = true
      this.errors = []

      if (this.content === '') {
        this.errors.push('Enter a task')
      }

      if (this.time === '') {
        this.errors.push('Enter a time')
      }
      console.log(this.errors)

      if (!this.errors.length) {
        const formData = {
          content: this.content,
          motivation: this.motivation,
          time: this.time,
          completed: false
        }

        axios
          .post("/api/v1/create-task/", formData)
          .then(response => {
            this.processing = false
            alert('Task created.')

            this.$navigateTo(Home, {clearHistory: true})

            // this.$router.push('/')
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }

              console.log(JSON.stringify(error.response.data))

            } else if (error) {
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
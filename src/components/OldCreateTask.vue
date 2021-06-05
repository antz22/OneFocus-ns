<template>
  <!-- <Page> -->
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Label class="header" text="New Task"></Label>

        <DropDown :items="PRIORITIES" selectedIndex="0"/>

        <GridLayout rows="auto, auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField class="input" hint="Task" v-model="content"
              returnKeyType="next"/>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField class="input" hint="Category" v-model="category"
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
import Tasks from '../views/Tasks.vue'

export default {
  name: 'Tasks',
  data() {
    return {
      content: '',
      category: '',
      priority: '',
      hours: 0,
      mins: 0,
      errors: [],

      processing: false,

      PRIORITIES: ['High', 'Medium', 'Low'],
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
          category: this.category,
          priority: this.priority,
          time: this.time,
          completed: false
        }

        axios
          .post("/api/v1/create-task/", formData)
          .then(response => {
            this.processing = false
            alert('Task created.')

            this.$navigateTo(Tasks, {clearHistory: true})

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



<template>


  
</template>

<script>
export default {

}
</script>

<style>

</style>
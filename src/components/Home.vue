<template>
  <Page>
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <StackLayout orientation="vertical">

      <GridLayout rows="auto,auto">
        <Label :text="quote.content" class="q-content" row="0"/>
        <Label :text="quote.author" class="q-author" row="1"/>
      </GridLayout>

      <Label class="header" text="Tasks"/>

      <StackLayout>
        <GridLayout v-for="task in tasks" :key="task.id" rows="auto,auto,auto" class="display-task">
          <Label :text="task.content" class="item-content" row="0" />
          <Label :text="task.time" row="1" />
          <Label :text="task.motivation" row="2" />
        </GridLayout>
      </StackLayout>

      <Label class="header" text="Goals"/>

      <StackLayout>
        <GridLayout v-for="goal in goals" :key="goal.id" rows="auto,auto,auto" cols="auto,auto" class="display-goal">
          <Label :text="goal.goal" class="item-content" row="0" col="0" />
          <Label :text="findProgress(goal.progress, goal.progressLimit)" row="1" col="0" />
        </GridLayout>
      </StackLayout>

      <StackLayout>
        <Label v-for="error in errors" :text="error" :key="error"/>
      </StackLayout>

    </StackLayout>
  </Page>
</template>

<script >
import axios from 'axios'

export default {
  data() {
    return {
      tasks: [],
      goals: [],
      quote: '',
      
      errors: [],
    }
  },
  mounted() {
    this.getTasks(),
    this.getGoals(),
    this.getQuote()
  },
  methods: {
    getQuote() {
      axios
        .get('/api/v1/quotes/')
        .then(response => {
          this.quote = response.data
        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }

            console.log(JSON.stringify(error.response.data))
          } else {
            this.errors.push('Something went wrong. Please try again.')
          }
        })
    },
    getTasks() {
      axios
        .get('/api/v1/tasks/')
        .then(response => {
          this.tasks = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getGoals() {
      axios
        .get('/api/v1/goals/')
        .then(response => {
          this.goals = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    findProgress(current, limit) {
      let calcProgress = parseInt(current/limit*100)
      return `${calcProgress}%`
    },

  },
}
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  text-align: center;
}

.q-content {
  font-size: 15;
  text-align: center;
  font-style: italic;
}

.q-author {
  font-size: 10;
  text-align: center;
}

.display-task {
  margin-bottom: 5;
  background-color: #53ba82;

}

.display-goal {
  margin-bottom: 5;
  background-color: #53ba82;

}

.item-content {
  text-align: center;

}
</style>

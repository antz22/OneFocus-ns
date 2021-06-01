<template>
  <!-- <Page> -->
    <!-- <ActionBar title="OneFocus"/> -->
    <ScrollView class="container">
      <StackLayout orientation="vertical">

        <GridLayout rows="auto,auto">
          <Label row="0" class="q-content" textWrap="true">
            <FormattedString>
              <Span text="&quot;"/>
              <Span :text="quote.content"/>
              <Span text="&quot;"/>
            </FormattedString>
          </Label>
          <Label :text="quote.author" class="q-author" row="1"/>
        </GridLayout>

        <Label class="header2" text="Tasks"/>

        <StackLayout>
          <GridLayout v-for="task in tasks" :key="task.id" rows="auto,auto,auto,auto" col="auto,auto" class="display-task">
            <Label :text="task.content" class="item-content" row="0" col="0" />
            <check-box :checked="task.completed" @checkedChange="completeTask(task.id, !task.completed); getTasks();" row="0" col="1" horizontalAlignment="right"/>
            <Label :text="task.motivation" class="item-motivation" row="1" col="0" />
            <GridLayout v-if="task.time > 0" row="2" col="0">
              <Label :text="showTime(task.time)" class="item-time" />
            </GridLayout>
            <Button class="archive" text="Archive" @tap="deleteTask(task.id); getTasks()" row="1" col="1" horizontalAlignment="right"/>
          </GridLayout>
        </StackLayout>

        <Label class="header2" text="Goals"/>

        <StackLayout>
          <GridLayout v-for="goal in goals" :key="goal.id" rows="auto,auto,auto,auto" cols="auto,auto" class="display-goal">
            <Label :text="goal.goal" class="item-goal" row="0" col="0" />
            <Label :text="findProgress(goal.progress, goal.progressLimit)" class="progress" row="1" col="0" />
            <Button class="archive archive-goal" text="Archive" @tap="deleteGoal(goal.id); getGoals()" row="2" col="0"/>
          </GridLayout>
        </StackLayout>

        <StackLayout>
          <Label v-for="error in errors" :text="error" :key="error"/>
        </StackLayout>

      </StackLayout>
    </ScrollView>
  <!-- </Page> -->
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
    completeTask(task_id, completed) {
      const formData = {
        id: task_id,
        completed: completed,
      }
      axios
        .post('/api/v1/create-task/', formData)
        .then(response => {
          alert('Task updated.')
        })
    },
    deleteTask(task_id) {
      confirm({
        title: "Archive Task?",
        okButtonText: "Archive",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result) {
          const formData = {
            id: task_id,
          }
          axios.post('/api/v1/delete-task/', formData)
        }
      })
    },
    deleteGoal(goal_id) {
      confirm({
        title: "Archive Goal?",
        okButtonText: "Archive",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result) {
          const formData = {
            id: goal_id,
          }
          axios.post('/api/v1/delete-goal/', formData)
        }
      })
    },
    findProgress(current, limit) {
      let calcProgress = parseInt(current/limit*100)
      return `${calcProgress}%`
    },
    showTime(mins) {
      if (mins < 60) {
        return `${mins} mins`
      } else if (mins === 60) {
        return '1 hour'
      } else if (mins%60 === 0) {
        let time = parseInt(mins/60)
        return `${time} hours`
      } else {
        let time = Math.floor(parseInt(mins/60))
        return `${time} hours, ${mins%60} mins`
      }
    },

  },
}
</script>

<style scoped>
.container {
  background-color: #FF8B94;
}


.q-content {
  margin-top: 5;
  font-size: 15;
  text-align: center;
  font-style: italic;
}

.q-author {
  text-align: center;
}

.display-task {
  margin-left: 15;
  margin-right: 15;
  margin-bottom: 20;
  /* background-color: #53ba82; */
  background-color: #FFAAA5;
  border-radius: 20px;

  -webkit-box-shadow: 3px 3px 5px 6px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow:    3px 3px 5px 6px #ccc;  /* Firefox 3.5 - 3.6 */
  box-shadow:         3px 3px 5px 6px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
/* #A8E6CF
#DCEDC1
#FFD3B6
#FFAAA5
#FF8B94 */

}

.display-goal {
  margin-left: 15;
  margin-right: 15;
  margin-bottom: 20;
  /* background-color: #53ba82; */
  background-color: #FFAAA5;
  border-radius: 20px;

  -webkit-box-shadow: 3px 3px 5px 6px #ccc;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow:    3px 3px 5px 6px #ccc;  /* Firefox 3.5 - 3.6 */
  box-shadow:         3px 3px 5px 6px #ccc;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
}

.item-content {
  font-weight: bold;
  font-size: 15;
  text-align: left;
  margin-top: 20;
  margin-left: 20;

}

.item-goal {
  font-weight: bold;
  font-size: 15;
  text-align: center;
  margin-top: 10;
}

.item-motivation {
  text-align: left;
  margin-top: 15;
  margin-left: 20;

}

.item-time {
  text-align: left;
  margin-top: 10;
  margin-left: 20;
  margin-bottom: 20;

}

.progress {
  text-align: center;
  margin-top: 10;

}

.archive {
  width: 80;
  margin-top: 10;
  height: 35;

}

check-box {
  margin-right: 20;
  margin-top: 20;
}

.archive-goal {
  margin-bottom: 16;
}
</style>

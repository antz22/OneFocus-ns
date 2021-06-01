<template>
  <Page>
    <ScrollView class="container">
      <StackLayout orientation="vertical">

        <StackLayout class="greeting-container">
          <Label class="greeting" text="Hello," />
          <Label class="greeting" text="anthony" />
        </StackLayout>


        <StackLayout class="tasks">
          <Label class="header3" text="Tasks"/>
          <Label class="row1">
            <FormattedString>
              <Span class="fas icon" text.decode="&#xf0ae;"/>
              <Span class="row-content" text="  5"/>
              <Span class="row-content" text=" Tasks"/>
            </FormattedString>
          </Label>
          <Label class="row2">
            <FormattedString>
              <Span class="fas icon" text.decode="&#xf00c;"/>
              <Span class="row-content" text="  13/14"/>
              <Span class="row-content" text=" Completed"/>
            </FormattedString>
          </Label>
          <Label class="row3">
            <FormattedString>
              <Span class="fas icon" text.decode="&#xf017;"/>
              <Span class="row-content" text="  2 hours, 30 mins"/>
              <Span class="row-content" text=" left"/>
            </FormattedString>
          </Label>
        </StackLayout>

        <StackLayout class="goals">
          <Label class="header3" text="Goals"/>
          <Label class="row1">
            <FormattedString>
              <Span class="fas icon" text.decode="&#xf024;"/>
              <Span class="row-content" text="  5"/>
              <Span class="row-content" text=" Goals"/>
            </FormattedString>
          </Label>
          <Label class="row3">
            <FormattedString>
              <Span class="fas icon" text.decode="&#xf080;"/>
              <Span class="row-content" text="  50%"/>
              <Span class="row-content" text=" Progress"/>
            </FormattedString>
          </Label>
        </StackLayout>

        <StackLayout>
          <Label v-for="error in errors" :text="error" :key="error"/>
        </StackLayout>

      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script >
// import axios from 'axios'

export default {
//   data() {
//     return {
//       tasks: [],
//       goals: [],
//       quote: '',
      
//       errors: [],
//     }
//   },
//   mounted() {
//     this.getTasks(),
//     this.getGoals(),
//     this.getQuote()
//   },
//   methods: {
//     getQuote() {
//       axios
//         .get('/api/v1/quotes/')
//         .then(response => {
//           this.quote = response.data
//         })
//         .catch(error => {
//           if (error.response) {
//             for (const property in error.response.data) {
//               this.errors.push(`${property}: ${error.response.data[property]}`)
//             }

//             console.log(JSON.stringify(error.response.data))
//           } else {
//             this.errors.push('Something went wrong. Please try again.')
//           }
//         })
//     },
//     getTasks() {
//       axios
//         .get('/api/v1/tasks/')
//         .then(response => {
//           this.tasks = response.data
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     },
//     getGoals() {
//       axios
//         .get('/api/v1/goals/')
//         .then(response => {
//           this.goals = response.data
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     },
//     completeTask(task_id, completed) {
//       const formData = {
//         id: task_id,
//         completed: completed,
//       }
//       axios
//         .post('/api/v1/create-task/', formData)
//         .then(response => {
//           alert('Task updated.')
//         })
//     },
//     deleteTask(task_id) {
//       confirm({
//         title: "Archive Task?",
//         okButtonText: "Archive",
//         cancelButtonText: "Cancel",
//       }).then((result) => {
//         if (result) {
//           const formData = {
//             id: task_id,
//           }
//           axios.post('/api/v1/delete-task/', formData)
//         }
//       })
//     },
//     deleteGoal(goal_id) {
//       confirm({
//         title: "Archive Goal?",
//         okButtonText: "Archive",
//         cancelButtonText: "Cancel",
//       }).then((result) => {
//         if (result) {
//           const formData = {
//             id: goal_id,
//           }
//           axios.post('/api/v1/delete-goal/', formData)
//         }
//       })
//     },
//     findProgress(current, limit) {
//       let calcProgress = parseInt(current/limit*100)
//       return `${calcProgress}%`
//     },
//     showTime(mins) {
//       if (mins < 60) {
//         return `${mins} mins`
//       } else if (mins === 60) {
//         return '1 hour'
//       } else if (mins%60 === 0) {
//         let time = parseInt(mins/60)
//         return `${time} hours`
//       } else {
//         let time = Math.floor(parseInt(mins/60))
//         return `${time} hours, ${mins%60} mins`
//       }
//     },

//   },
}
</script>

<style scoped>

.greeting-container {
  margin-left: 30;
  margin-top: 30;
  line-height: 20px;
}

.greeting {
  font-weight: 300;
  font-size: 45px;
}

.tasks {
  background-color: lightblue;
  border-radius: 10;
  margin-left: 20;
  margin-right: 20;
  margin-top: 30;
}

.goals {
  background-color: lightgreen;
  border-radius: 10;
  margin-left: 20;
  margin-right: 20;
  margin-top: 30;
}

.header3 {
  text-align: left;
  font-weight: normal;
  font-size: 23px;
  margin-left: 20;
  margin-top: 15;

  border-color: lightgray;
  border-width: 0 0 2 0;
}

.row1 {
  margin-top: 20;
  margin-left: 15;
}

.row2 {
  margin-top: 20;
  margin-left: 15;
}

.row3 {
  margin-top: 20;
  margin-bottom: 20;
  margin-left: 15;
}

.row-content {
  font-weight: 300;
  font-size: 17px;
}

.icon {
  font-size: 17px;
}

</style>

<template>

  <!-- Nested inside Tasks.vue -->


  <!-- Tasks -->
  <GridLayout class="tasks" rows="auto" v-if="displayTasks">


    <!-- Priority -->
    <GridLayout v-for="(priorityIndex, index) in priorityNums" :key="priorityIndex" class="priority" :rows="rows" row="0">

      <Label v-if="checkUserHasPriority(priorityIndex)" class="priority-title" :text="priorities[priorityIndex-1]" :row="index"/>

      <!-- Task -->
      <GridLayout v-for="(task, taskIndex) in tasks[priorityIndex][priorities[priorityIndex-1]]" :key="task.id"
        class="task" :class="getPriority(task.priority)" rows="auto,auto" cols="auto,auto" :row="index+taskIndex+1">

        <Label class="content" :text="task.content" horizontalAlignment="left" row="0"/>
        <Label v-if="task.time > 0" class="time" :text="showTime(task.time)" horizontalAlignment="right" row="0"/>
        <Label class="category" :text="task.category_name"  horizontalAlignment="left" row="1"/>
        <Label v-if="!task.completed" class="check far" text.decode="&#xf111;" @tap="updateTask(task.id, !task.completed)" horizontalAlignment="right" row="1"/>
        <Label v-else class="check fas" text.decode="&#xf00c;" @tap="updateTask(task.id, !task.completed)" horizontalAlignment="right" row="1"/>

      </GridLayout>
    </GridLayout>

    <!-- Urgent 
    <GridLayout class="priority" rows="auto,auto" row="0">
      <Label class="urgent" text="Urgent" row="0"/>
      <GridLayout class="task" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Design a good app" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="category" text="Coding"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout>

    Normal 
    <GridLayout class="priority" rows="auto,auto" row="1">
      <Label class="normal" text="Normal" row="0"/>
      <GridLayout class="task" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Learn how to cook" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="category" text="Personal"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout>

    Low 
    <GridLayout class="priority" rows="auto,auto" row="2">
      <Label class="low" text="Low" row="0"/>
      <GridLayout class="task" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Walk the dog" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="category" text="Coding"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout> -->

  </GridLayout>

</template>

<script>
import axios from 'axios'

export default {
  name: 'TasksPriority',
  data() {
    return {
      tasks: {},
      priorities: ["High", "Medium", "Low"],
      priorityNums: ["1", "2", "3"],
      rowIndex: 0,

      displayTasks: false,
    }
  },
  created() {
    this.getTasks()
    // this.$nextTick(() => {
      // this.displayTasks = true
    // })
  },
  methods: {
    getTasks() {
      axios
        .get('/api/v1/tasks/')
        .then(response => {
          let tasks = response.data
          let priorityNums = this.priorityNums
          let priorities = this.priorities

          for (let i = 0; i < priorityNums.length; i++) {
            let priority = {}
            // priority object with key as "High", "Medium" or "Low", pointing to an empty array to be filled with tasks
            priority[priorities[i]] = []
            this.tasks[priorityNums[i]] = priority
          }

          for (let i = 0; i < tasks.length; i++) {
            let taskPriority = tasks[i].priority
            let priorityIndex = taskPriority - 1
            this.tasks[taskPriority][priorities[priorityIndex]].push(tasks[i])
          }
          console.log(this.tasks)
          this.displayTasks = true
        })
        .catch(error => {
          console.log(error)
        })
    },
    showTime(mins) {
      if (mins < 60) {
        return `${mins} mins`
      } else if (mins%60 === 0) {
        let time = parseInt(mins/60)
        return `${time}h00`
      } else {
        let time = Math.floor(parseInt(mins/60))
        return `${time}h${mins%60}`
      }
    },
    getPriority(priority) {
      if (priority === "3") {
        return 'b-high'
      } else if (priority === "2") {
        return 'b-medium'
      } else if (priority === "1") {
        return 'b-low'
      }
    },
    checkUserHasPriority(priorityIndex) {
      console.log('checkpriority',this.tasks)
      if (this.tasks[priorityIndex][this.priorities[priorityIndex-1]].length !== 0) {
        return true
      } else {
        return false
      }
    },
  },
  computed: {
    rows() {
      const rows = [];
      for (let i = 0; i < this.tasks.length+3; i++) {
        rows.push("auto")
      }
      return rows.join(",")
    }
  },
}
</script>

<style scoped>

/* priorities */

.priority {
  margin-top: 20;
}

/* task card */

.category {
  font-weight: normal;
  font-size: 16px;
  margin-top: 5;
  margin-left: 10;
  margin-bottom: 10;
}

</style>
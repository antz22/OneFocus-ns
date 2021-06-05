<template>

  <!-- Nested inside Tasks.vue -->

  <!-- Tasks -->
  <GridLayout class="tasks" :rows="rows" v-if="displayTasks">


    <!-- Category -->
    <GridLayout v-for="(category, index) in categories" :key="index" class="category" rows="auto,auto" :row="row">

      <Label class="category-title" :text="category.category" :row="index"/>

      <!-- Task -->
      <GridLayout v-for="(task, taskIndex) in tasks[category.id][category.category]" :key="task.id"
        class="task" :class="getPriority(task.priority)" rows="auto,auto" cols="auto,auto" row="1">

        <Label class="content" :text="task.content" horizontalAlignment="left" row="0"/>
        <Label v-if="task.time > 0" class="time" :text="showTime(task.time)" horizontalAlignment="right" row="0"/>
        <Label class="priority" :text="taskIndex"  horizontalAlignment="left" row="1"/>
        <Label v-if="!task.completed" class="check far" text.decode="&#xf111;" @tap="updateTask(task.id, !task.completed)" horizontalAlignment="right" row="1"/>
        <Label v-else class="check fas" text.decode="&#xf00c;" @tap="updateTask(task.id, !task.completed)" horizontalAlignment="right" row="1"/>

      </GridLayout>
    </GridLayout>

    <!-- Task -->
    <!-- <GridLayout v-for="task in tasks" :key="task.id" 
      class="task" :class="getPriority(task.priority)" rows="auto,auto" cols="auto,auto" row="1">

      <Label class="content" :text="task.content" horizontalAlignment="left" row="0"/>
      <Label v-if="task.time > 0" class="time" :text="showTime(task.time)" horizontalAlignment="right" row="0"/>
      <Label class="category" :text="task.category_name"  horizontalAlignment="left" row="1"/>
      <Label class="check" text="check?" horizontalAlignment="right" row="1"/>

    </GridLayout> -->

    <!-- Category 1  -->
    <!-- <GridLayout class="category" rows="auto,auto" row="0">
      <Label class="category-title" text="Coding" row="0"/>
      <GridLayout class="task b-high" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Design a good app" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="priority high" text="High Priority"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout> -->

    <!-- Category 2  -->
    <!-- <GridLayout class="category" rows="auto,auto" row="1">
      <Label class="category-title" text="Personal" row="0"/>
      <GridLayout class="task b-medium" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Learn how to cook" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="priority medium" text="Medium Priority"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout> -->

    <!-- Category 3  -->
    <!-- <GridLayout class="category" rows="auto,auto" row="2">
      <Label class="category-title" text="Self" row="0"/>
      <GridLayout class="task b-low" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Walk the dog" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="priority low" text="Low Priority"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout> -->

  </GridLayout>

</template>

<script>
import axios from 'axios'

export default {
  name: 'TasksCategory',
  data() {
    return {
      tasks: {},
      categories: [],
      errors: [],
      displayTasks: false,
    }
  },
  created() {
    this.getCategories()
    this.getTasks()
  },
  methods: {
    getCategories() {
      axios
        .get('/api/v1/categories/')
        .then(response => {
          this.categories = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTasks() {
      axios
        .get('/api/v1/tasks/')
        .then(response => {
          let tasks = response.data
          let categories = this.categories
          
          for (let i = 0; i < categories.length; i++) {
            let category = {}
            category[categories[i].category] = []
            this.tasks[categories[i].id] = category
          }

          for (let i = 0; i < tasks.length; i++) {
            for (let j = 0; j < categories.length; j++) {
              let category = categories[j].category
              
              if (tasks[i].category_name == category) {
                this.tasks[categories[j].id][category].push(tasks[i])
              }
            }
          }
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
      if (priority === "High") {
        return 'b-high'
      } else if (priority === "Medium") {
        return 'b-medium'
      } else if (priority === "Low") {
        return 'b-low'
      }
    },
    updateTask(task_id, completed) {
      this.$emit('completeTask', task_id, completed)
      this.getTasks()
    },
    archiveTask(task_id) {
      this.$emit('archiveTask', task_id)
      this.getTasks()
    }
  },
  computed: {
    rows() {
      const rows = [];
      for (let i = 0; i < this.tasks.length; i++) {
        rows.push("auto")
      }
      return rows.join(",")
    },
    row() {

    }
  },
}
</script>

<style scoped>

/* categories */

.category {
  margin-top: 20;
}

.category-title {
  margin-top: 20;
  margin-bottom: 10;
  font-size: 22px;
}


/* task card */

.priority {
  font-weight: normal;
  font-size: 16px;
  margin-top: 5;
  margin-left: 10;
  margin-bottom: 10;
}

.high {
  color: #FF0000;
}
.medium {
  color: #D1B000;
}
.low {
  color: #5CD100;
}


</style>
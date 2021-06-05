<template>
  <!-- <Page> -->
    <StackLayout orientation="vertical">

      <!-- Title -->
      <GridLayout class="title-container" rows="auto,auto">
        <Label class="title" text="Tasks" horizontalAlignment="left"/>
        <!-- <Label class="sort" horizontalAlignment="right">
          <Button @tap="sortDate" text="date" />
          <Button @tap="sortPriority" text="priority" />
          <Button @tap="sortCategory" text="category" />
        </Label> -->
        <Button row="1" text="date" @tap="sortDate" horizontalAlignment="left"/>
        <Button row="1" text="priority" @tap="sortPriority" horizontalAlignment="center"/>
        <Button row="1" text="category" @tap="sortCategory" horizontalAlignment="right"/>
      </GridLayout>

      <!-- Create Task  -->
      <!-- <CreateTask /> -->

			<!-- <AbsoluteLayout ref="fabItemPosition" marginTop="87%" marginLeft="80%">
				<AddButton @onButtonTap="createTaskForm" :isActive="isActive" />
			</AbsoluteLayout> -->


      <!-- Sort by parameter -->
      <TasksDate v-if="byDate" @completeTask="completeTask"/>
      <TasksCategory v-if="byCategory" @completeTask="completeTask"/>
      <TasksPriority v-if="byPriority" @completeTask="completeTask"/>


      <!-- Display errors -->
      <!-- <Label v-for="error in errors" :key="error"/> -->


    </StackLayout>

  <!-- </Page> -->
</template>

<script>
import axios from 'axios'
import CreateTask from '../components/CreateTask.vue'
import TasksCategory from '../components/TasksCategory.vue'
import TasksDate from '../components/TasksDate.vue'
import TasksPriority from '../components/TasksPriority.vue'
import AddButton from '../components/AddButton.vue'

export default {
  name: 'Tasks',
  data() {
    return {
      byDate: true,
      byCategory: false,
      byPriority: false,
      errors: ['bah'],
      processing: false,
      isActive: false,
    }
  },
  components: {
    CreateTask,
    TasksCategory,
    TasksPriority,
    TasksDate,
    AddButton,
  },
  methods: {
    sortDate() {
      this.byDate = true
      this.byCategory = false
      this.byPriority = false
    },
    sortCategory() {
      this.byDate = false
      this.byCategory = true
      this.byPriority = false
    },
    sortPriority() {
      this.byDate = false
      this.byCategory = false
      this.byPriority = true
    },
    createTaskForm(args) {
      this.isActive == !this.isActive
      this.displayTaskForm == !this.displayTaskForm
    },
    completeTask(task_id, completed) {
      const formData = {
        id: task_id,
        completed: completed,
      }
      axios
        .post('/api/v1/create-task/', formData)
        .then(response => {
          toast({
            message: 'Task updated.',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })
        })
    },
  }
}
</script>

<style scoped>

Page {
  font-family: "Montserrat", "Montserrat Regular 400"
}

/* title */

.title-container {
  margin-top: 20;
}

.title {
  font-family: Montserrat, Montserrat SemiBold 600;
  margin-left: 32;
  font-weight: normal;
  font-size: 28px;
}

.sort {
  margin-right: 32;
  margin-top: 4;
  font-weight: normal;
  font-size: 24px;
  color: #515151;
}

.tasks {
  margin-left: 32;
  margin-right: 32;
}

</style>
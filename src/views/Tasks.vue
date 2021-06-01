<template>
  <Page>
    <StackLayout orientation="vertical">

      <!-- Title -->
      <GridLayout class="title-container" rows="auto,auto">
        <Label class="title" text="Tasks" horizontalAlignment="left"/>
        <Label class="sort" horizontalAlignment="right">
          <FormattedString>
            <Span text="by "/>
            <!-- <Span text="date" @tap="sortDate"/> -->
            <!-- <Span text="priority," @tap="sortPriority"/> -->
            <!-- <Span text="category," @tap="sortCategory"/> -->
            <!-- <DropDown :items="items"/> -->
            <!-- <ListPicker items="['category', 'priority', 'date']"/> -->
          </FormattedString>
        </Label>
        <Button row="1" text="date" @tap="sortDate" horizontalAlignment="left"/>
        <Button row="1" text="priority" @tap="sortPriority" horizontalAlignment="center"/>
        <Button row="1" text="category" @tap="sortCategory" horizontalAlignment="right"/>
      </GridLayout>


      <!-- Sort by parameter -->
      <TasksDate v-if="byDate" :taskArray="tasks"/>
      <TasksCategory v-if="byCategory" :taskArray="tasks"/>
      <TasksPriority v-if="byPriority" :taskArray="tasks"/>


      <!-- Create Task  -->

      <CreateTask v-if="displayTaskForm" />


			<AbsoluteLayout ref="fabItemPosition" marginTop="87%" marginLeft="80%">
				<!-- <GridLayout ref="fabItemContainer" left="8" top="8">
					<FabItem row="1" :class="classItem1" color="#E94E77" title="E" />
					<FabItem row="1" :class="classItem2" color="#3FB8AF" title="U" />
					<FabItem row="1" :class="classItem3" color="#FCB653" title="V" />
				</GridLayout> -->
				<FabButton @onButtonTap="createTask" :isActive="isActive" />
			</AbsoluteLayout>


      <!-- Display errors -->
      <Label v-for="error in errors" :key="error" text="error"/>


    </StackLayout>

  </Page>
</template>

<script>
import axios from 'axios'
import CreateTask from '../components/CreateTask.vue'
import TasksCategory from '../components/TasksCategory.vue'
import TasksDate from '../components/TasksDate.vue'
import TasksPriority from '../components/TasksPriority.vue'
import Button from '../components/Button.vue'

export default {
  name: 'Tasks',
  data() {
    return {
      byDate: true,
      byCategory: false,
      byPriority: false,

      displayTaskForm: false,

      tasks: [],
      
      errors: [],

      processing: false,
    }
  },
  components: {
    CreateTask,
    TasksCategory,
    TasksPriority,
    TasksDate,
    Button,
  },
  mounted() {
    this.getTasks()
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
    getTasks() {
      axios
        .get('/api/v1/tasks/')
        .then(response => {
          this.tasks = response.data
        })
        .catch(error => {
          this.errors.push(error)
        })
    },
    createTask(args) {

    }
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

/* FabButton - from nativescript market */

/* ListView Label {
  height: 48;
  min-height: 48;
}

.backdrop {
  background-color: rgba(29, 30, 35, .90);
  opacity: 0;
}

.backdrop-visible {
  animation-name: activateBackdrop;
  animation-duration: .25;
  animation-fill-mode: forwards;
}

.backdrop-invisible {
  animation-name: activateBackdrop;
  animation-duration: .25;
  animation-fill-mode: forwards;
  animation-direction: reverse;
} 

.raiseItem1 {
  opacity: 1;
  animation-name: raiseItem1;
  animation-duration: .25;
  animation-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
  animation-fill-mode: forwards;
}

.raiseItem2 {
  opacity: 1;
  animation-name: raiseItem2;
  animation-duration: .25;
  animation-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
  animation-fill-mode: forwards;
}

.raiseItem3 {
  opacity: 1;
  animation-name: raiseItem3;
  animation-duration: .25;
  animation-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
  animation-fill-mode: forwards;
}

.downItem1 {
  animation-name: raiseItem1;
  animation-duration: .20;
  animation-timing-function: cubic-bezier(0.895, 0.030, 0.685, 0.220);
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

.downItem2 {
  animation-name: raiseItem2;
  animation-duration: .20;
  animation-timing-function: cubic-bezier(0.895, 0.030, 0.685, 0.220);
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

.downItem3 {
  animation-name: raiseItem3;
  animation-duration: .20;
  animation-timing-function: cubic-bezier(0.895, 0.030, 0.685, 0.220);
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

@keyframes activateBackdrop {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes raiseItem1 {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }
  to {
    opacity: 1;
    transform: translate(0, -64);
  }
}

@keyframes raiseItem2 {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }
  to {
    opacity: 1;
    transform: translate(0, -128);
  }
}

@keyframes raiseItem3 {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }
  to {
    opacity: 1;
    transform: translate(0, -192);
  }
}
*/


</style>
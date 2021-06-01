<template>

  <!-- Nested inside Tasks.vue -->

  <!-- Tasks  -->
  <GridLayout class="tasks" :rows="rows">

    <Label class="list-title" text="Most Reccent" row="0"/>

    <!-- Task -->
    <GridLayout v-for="task in tasks" :key="task.id" 
      class="task" :class="getPriority(task.priority)" rows="auto,auto" cols="auto,auto" row="1">

      <Label class="content" :text="task.content" horizontalAlignment="left" row="0"/>
      <Label v-if="task.time > 0" class="time" :text="showTime(task.time)" horizontalAlignment="right" row="0"/>
      <Label class="category" :text="task.category"  horizontalAlignment="left" row="1"/>
      <Label class="check" text="check?" horizontalAlignment="right" row="1"/>

    </GridLayout>


    <!-- <GridLayout class="task b-high" rows="auto,auto" cols="auto,auto" row="1">
      <Label class="content" text="Design a good app" horizontalAlignment="left" row="0"/>
      <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
      <Label class="category" text="Coding"  horizontalAlignment="left" row="1"/>
      <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
    </GridLayout>

    <GridLayout class="task b-medium" rows="auto,auto" cols="auto,auto" row="2">
      <Label class="content" text="Learn how to cook" horizontalAlignment="left" row="0"/>
      <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
      <Label class="category" text="Personal"  horizontalAlignment="left" row="1"/>
      <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
    </GridLayout>

    <GridLayout class="task b-low" rows="auto,auto" cols="auto,auto" row="3">
      <Label class="content" text="Walk the dog" horizontalAlignment="left" row="0"/>
      <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
      <Label class="category" text="Self"  horizontalAlignment="left" row="1"/>
      <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
    </GridLayout> -->

  </GridLayout>

</template>

<script>

export default {
  name: 'TasksDate',
  props: {
    taskArray: Array
  },
  data() {
    return {
      tasks: this.tasksArray
    }
  },
  methods: {
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
    }
  },
  computed: {
    rows() {
      const rows = [];
      for (let i = 0; i < this.tasks.length; i++) {
        rows.push("auto")
      }
      return rows.join(",")
    }
  },
}
</script>

<style scoped>

/* categories */

.list-title {
  margin-top: 40;
  margin-bottom: 20;
  font-size: 22px;
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
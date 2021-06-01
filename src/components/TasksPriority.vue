<template>

  <!-- Nested inside Tasks.vue -->

  <!-- Tasks -->
  <GridLayout class="tasks" :rows="rows">

    <!-- Urgent  -->
    <GridLayout class="priority" rows="auto,auto" row="0">
      <Label class="urgent" text="Urgent" row="0"/>
      <GridLayout class="task" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Design a good app" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="category" text="Coding"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout>

    <!-- Normal  -->
    <GridLayout class="priority" rows="auto,auto" row="1">
      <Label class="normal" text="Normal" row="0"/>
      <GridLayout class="task" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Learn how to cook" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="category" text="Personal"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout>

    <!-- Low  -->
    <GridLayout class="priority" rows="auto,auto" row="2">
      <Label class="low" text="Low" row="0"/>
      <GridLayout class="task" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Walk the dog" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="category" text="Coding"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout>

  </GridLayout>

</template>

<script>

export default {
  name: 'TasksPriority',
  props: {
    taskArray: Array
  },
  data() {
    return {
      tasks: this.tasksArray
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
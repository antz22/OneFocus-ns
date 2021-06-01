<template>

  <!-- Nested inside Tasks.vue -->

  <!-- Tasks -->
  <GridLayout class="tasks" :rows="rows">

    <!-- Category 1  -->
    <GridLayout class="category" rows="auto,auto" row="0">
      <Label class="category-title" text="Coding" row="0"/>
      <GridLayout class="task b-high" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Design a good app" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="priority high" text="High Priority"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout>

    <!-- Category 2  -->
    <GridLayout class="category" rows="auto,auto" row="1">
      <Label class="category-title" text="Personal" row="0"/>
      <GridLayout class="task b-medium" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Learn how to cook" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="priority medium" text="Medium Priority"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout>

    <!-- Category 3  -->
    <GridLayout class="category" rows="auto,auto" row="2">
      <Label class="category-title" text="Self" row="0"/>
      <GridLayout class="task b-low" rows="auto,auto" cols="auto,auto" row="1">
        <Label class="content" text="Walk the dog" horizontalAlignment="left" row="0"/>
        <Label class="time" text="2h30" horizontalAlignment="right" row="0"/>
        <Label class="priority low" text="Low Priority"  horizontalAlignment="left" row="1"/>
        <Label class="check" text="check?" horizontalAlignment="right" row="1"/>
      </GridLayout>
    </GridLayout>

  </GridLayout>

</template>

<script>

export default {
  name: 'TasksCategory',
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
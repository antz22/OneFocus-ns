<template>
  <Page>

    <ActionBar title="OneFocus" android:flat="true"/>

    <TabView android:tabBackgroundColor="#53ba82"
              android:tabTextColor="#c4ffdf"
              android:selectedTabTextColor="#ffffff"
              androidSelectedTabHighlightColor="#ffffff"
              androidTabsPosition="bottom"
              selectedIndex="0">

      <TabViewItem title="Home">
        <GridLayout columns="*" rows="*">
          <Home/>
        </GridLayout>
      </TabViewItem>

      <TabViewItem title="Tasks">
        <GridLayout columns="*" rows="*">
          <Task/>
        </GridLayout>
      </TabViewItem>

      <TabViewItem title="Goals">
        <GridLayout columns="*" rows="*">
          <Goal/>
        </GridLayout>
      </TabViewItem>

      <TabViewItem title="Pomodoro">
        <GridLayout columns="*" rows="*">
          <Pomodoro/>
        </GridLayout>
      </TabViewItem>

      <!-- <TabViewItem title="About">
        <GridLayout columns="*" rows="*">
          <About/>
        </GridLayout>
      </TabViewItem> -->

    </TabView>

  </Page>


  <!-- <Page>

      <TabViewItem title="Home">
        <GridLayout columns="*" rows="*">
        <Frame id="home">
        <Home/>
          <Label text="hi"></Label>
        </Frame>
        </GridLayout>
      </TabViewItem>

  </Page> -->
</template>

<script>
import Home from "./Home.vue";
import Task from "./Task.vue";
import Goal from "./Goal.vue";
import Pomodoro from "./Pomodoro.vue";
import About from "./About.vue";

export default {
  components: {
    Home,
    Task,
    Goal,
    Pomodoro,
    About
  }
};

</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

</style>
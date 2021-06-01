<template>
  <Page actionBarHidden="true">

    <!-- <ActionBar title="OneFocus" android:flat="true"/> -->

    <TabView android:tabBackgroundColor="#53ba82"
              android:tabTextColor="#c4ffdf"
              android:selectedTabTextColor="#ffffff"
              androidSelectedTabHighlightColor="#ffffff"
              androidTabsPosition="bottom"
              selectedIndex="0">

      <!-- <TabViewItem class="fas" title.decode="Home &#xf015;"> -->
      <TabViewItem title="Home">
        <GridLayout columns="*" rows="*">
          <Home/>
        </GridLayout>
      </TabViewItem>

      <!-- <TabViewItem class="fas" title.decode="Tasks &#xf0ae;"> -->
      <TabViewItem title="Tasks">
        <GridLayout columns="*" rows="*">
          <Tasks/>
        </GridLayout>
      </TabViewItem>

      <!-- <TabViewItem class="fas" title.decode="Goals &#xf024;"> -->
      <TabViewItem title="Goals">
        <GridLayout columns="*" rows="*">
          <Goals/>
        </GridLayout>
      </TabViewItem>

      <!-- <TabViewItem class="fas" title.decode="Pomodoro &#xf017;"> -->
      <TabViewItem title="Pomo">
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
</template>

<script>
import Home from "./Home.vue";
import Tasks from "./Tasks.vue";
import Goals from "./Goals.vue";
import Pomodoro from "./Pomodoro.vue";

export default {
  components: {
    Home,
    Tasks,
    Goals,
    Pomodoro,
  }
};

</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

Page {
  font-family: "Montserrat", "Montserrat-Regular"
}

</style>
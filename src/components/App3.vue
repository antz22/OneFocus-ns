<template>
  <Page>
    <ActionBar title="OneFocus"/>

    <BottomNavigation>
      <TabStrip>
        <Image src="../assets/images/NativeScript-Vue.png"/>
        <Label text="Home"/>
      </TabStrip>
      <TabStrip>
        <Image src="../assets/images/NativeScript-Vue.png"/>
        <Label text="Tasks"/>
      </TabStrip>
      <TabStrip>
        <Image src="../assets/images/NativeScript-Vue.png"/>
        <Label text="Goals"/>
      </TabStrip>
      <TabStrip>
        <Image src="../assets/images/NativeScript-Vue.png"/>
        <Label text="Pomodoro"/>
      </TabStrip>
      <TabStrip>
        <Image src="../assets/images/NativeScript-Vue.png"/>
        <Label text="About"/>
      </TabStrip>

      <TabContentItem>
        <Home/>
      </TabContentItem>
      <TabContentItem>
        <Task/>
      </TabContentItem>
      <TabContentItem>
        <Goal/>
      </TabContentItem>
      <TabContentItem>
        <Pomodoro/>
      </TabContentItem>
      <TabContentItem>
        <About/>
      </TabContentItem>

    </BottomNavigation>
  </Page>
</template>

<script>
import Home from "./Home.vue";
import Task from "./Task.vue";
import Goal from "./Goal.vue";
import Pomodoro from "./Pomodoro.vue";
import About from "./About.vue";
import BottomNavigation from '../../node_modules/@nativescript/core/ui/bottom-navigation'
import { TabContentItem } from '../../node_modules/@nativescript/core/ui/tab-navigation-base/tab-content-item'
import { TabStrip } from '../../node_modules/@nativescript/core/ui/tab-navigation-base/tab-strip'
// import { TabContentItem } from 'nativescript-core-ui-bottom-navigation'

// bottomNav = new BottomNavigation
tabContent = new TabContentItem
tabStrip = new TabStrip

export default {
  components: {
    Home,
    Task,
    Goal,
    Pomodoro,
    About,

    bottomNav,
    tabContent,
    tabStrip,
  }
};
</script>

<style>

</style>
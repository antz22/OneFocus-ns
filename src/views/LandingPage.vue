<template>
  <Page actionBarHidden="true">
    <GridLayout rows="*,auto">
      <GridLayout class="cover" row="0" rows="*">
        <Label class="fas icon" text.decode="&#xf02d;" verticalAlignment="center"
          horizontalAlignment="center"/>
        <Label text="OneFocus" class="app-name" verticalAlignment="center" 
          horizontalAlignment="center"/>
        <Label text="" height="30" />
      </GridLayout>
      <GridLayout row="1" cols="2" class="btns-container">
        <Button text="LOGIN" horizontalAlignment="left"
          class="btn-landing-left" @tap="goToLogin"/>
        <Button text="REGISTER" horizontalAlignment="right"
          class="btn-landing-right" @tap="goToSignup" />
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import Login from './Login.vue'

export default {
  name: 'LandingPage',
  components: {
    Login, 
  },
  methods: {
    goToLogin() {
      this.$navigateTo(Login)
    },
    goToSignup() {
      this.$navigateTo(Login)
    }

  }

};
</script>

<style scoped>
.cover {
  background-image: url('~/assets/landing.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  margin-bottom: 20;
  filter: brightness(50%);
}

.icon {
  font-size: 48px;
  font-weight: 500;
  color: white;
  margin-bottom: 160;
}

.app-name {
  font-size: 48px;
  font-weight: 500;
  color: white;
  margin-bottom: 40;
}

.btns-container {
  bottom: 5;
}

.btn-landing-left {
  margin-left: 35;
  margin-bottom: 20;
  width: 150;
  height: 50;
  background-color: white;
  border-radius: 18;
  border-width: 1;
  border-color: #A9988D;
  color: #A9988D;
  font-size: 22;
  font-weight: 400;
}

.btn-landing-right {
  margin-right: 35;
  margin-bottom: 20;
  width: 150;
  height: 50;
  background-color: #A9988D;
  border-radius: 18;
  border-width: 1;
  color: white;
  font-size: 22;
  font-weight: normal;
}
</style>
<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <!-- <Image class="logo" src="~/images/logo.png"></Image> -->
        <Label class="header" text="OneFocus"></Label>

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField class="input" hint="Username" :isEnabled="!processing"
              keyboardType="email" autocorrect="false"
              autocapitalizationType="none" v-model="user.username"
              returnKeyType="next" @returnPress="focusPassword"></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField class="input" ref="password" :isEnabled="!processing"
              hint="Password" secure="true" v-model="user.password"
              :returnKeyType="isLoggingIn ? 'done' : 'next'"
              @returnPress="focusConfirmPassword"></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
            <TextField class="input" ref="confirmPassword" :isEnabled="!processing"
              hint="Confirm password" secure="true" v-model="user.confirmPassword"
              returnKeyType="done"></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" :isEnabled="!processing"
          @tap="submit" class="btn btn-primary m-t-20"></Button>
        <Label *v-show="isLoggingIn" text="Forgot your password?"
          class="login-label" @tap="forgotPassword()"></Label>
      </StackLayout>

      <Label v-if="errors.length" >
        <FormattedString>
          <Span v-for="error in errors" :key="error" :text="error"></Span>
        </FormattedString>
      </Label>

      <Label class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"></Span>
          <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
        </FormattedString>
      </Label>


    </FlexboxLayout>
  </Page>
</template>

<script>
import Home from "./Home";
import Task from "./Task";
import App from "./App";
import axios from 'axios'

export default {
  data() {
    return {
      isLoggingIn: true,
      processing: false,
      user: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      errors: [],
    };
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    submit() {
      if (!this.user.username || !this.user.password) {
        this.alert(
          "Please provide both an email address and password."
        );
        return;
      }

      this.processing = true;
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    async login() {
      this.errors = []

      axios.defaults.headers.common["Authorization"] = ""
      
      // localStorage.removeItem("token")

      const formData = {
        username: this.user.username,
        password: this.user.password
      }

      const headers = {
       "Content-Type": "application/json"
      }

      axios
        .post('/api/v1/token/login/', formData, {
          headers: headers
        })
        .then(response => {
          this.processing = false

          const token = response.data.auth_token
          this.$store.commit('setToken', token)
          axios.defaults.headers.common["Authorization"] = "Token " + token
          // localStorage.setItem("token", token)

          // const toPath = this.$route.query.to || '/'

          this.$navigateTo(App, {clearHistory: true})
        })
        .catch(error => {
          this.processing = false
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${error.response.data[property]}`)
            }
          } else {
            this.errors.push('Something went wrong. Please try again')

            console.log(JSON.stringify(error))
          }
        })
    },

    register() {
      this.errors = []

      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        this.processing = false;
        return;
      }

      const formData = {
        username: this.user.username,
        password: this.user.password
      }

      const headers = {
        "Content-Type": "application/json"
      }

      axios
        .post('/api/v1/users/', formData, {
          headers: headers
        })
        .then(response => {
          this.processing = false
          this.isLoggingIn = true
          this.alert("Account created, please log in.")
          this.$navigateTo(Login, {clearHistory: true})
        })
        .catch(error => {
          console.log('bah')
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
              console.log(property)
            }

            console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            this.errors.push('Something went wrong. Please try again.')
            console.log(JSON.stringify(error.response.data))
          }
        })

    },

    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message: "Enter the email address you used to register for OneFocus to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(data => {
        if (data.result) {
          this.$backendService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
              );
            })
            .catch(() => {
              this.alert(
                "Unfortunately, an error occurred resetting your password."
              );
            });
          }
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },

    alert(message) {
      return alert({
        title: "OneFocus",
        okButtonText: "OK",
        message: message
      });
    }
  }
};
</script>

<style>
.page {
  align-items: center;
  flex-direction: column;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #D51A1A;
}

.header2 {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  text-align: center;
  margin-top: 15;
  margin-bottom: 10;
}


.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #A8A8A8;
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.btn-primary {
  margin: 30 5 15 5;
}

.login-label {
  horizontal-align: center;
  color: #A8A8A8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
</style>

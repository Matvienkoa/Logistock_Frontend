<template>
  <div id="home">
    <div id="spinner" class="spinner-off">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <img src="../assets/pizza-back.webp" alt="" id="pizza-back">
    <div id="form">
      <div id="logo-main">
        <img src="../assets/logo.png" alt="" id="logo-sp">
      </div>
      <div id="form-input">
        <p class="label-form">Identifiant</p>
        <input @input="cancelError()" v-model="login" type="text" class="input required" id="login-input">
        <p class="label-form">Mot de Passe</p>
        <div class="password-box">
          <input @input="cancelError()" @keyup.enter="logedIn()" v-model="password" type="password" class="required" id="password-input">
          <img crossorigin="anonymous" v-if="modePassword === 'hidden'" @click="showPassword()" class="home-form-password-icon" alt="" src="../assets/eye.svg">
          <img crossorigin="anonymous" v-if="modePassword === 'visible'" @click="hidePassword()" class="home-form-password-icon" alt="" src="../assets/eye-slash.svg">
        </div>
        <div v-if="error" class="error">{{ error.message }}</div>
      </div>
      <button @click="logedIn()" id="button-login">Connexion</button>
      <div id="logos-2">
        <img src="../assets/1.webp" alt="" class="logo-login-2">
        <img src="../assets/2.webp" alt="" class="logo-login-2">
      </div>
    </div>
    <div id="logos-1">
      <img src="../assets/logo-sp-petit.png" alt="" class="logo-login-1">
      <img src="../assets/logo-mburger-petit.webp" alt="" class="logo-login-1">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      error: "",
      login: "",
      password: "",
      modePassword: 'hidden'
    }
  },
  computed: {
      ...mapGetters(['getProfile'])
  },
  methods: {
    showPassword() {
      this.modePassword = 'visible'
      const input = document.getElementById('password-input')
      input.type = 'text'
    },
    hidePassword() {
      this.modePassword = 'hidden'
      const input = document.getElementById('password-input')
      input.type = 'password'
    },
    showSpinner() {
      const spinner = document.getElementById('spinner');
      spinner.classList.replace('spinner-off', 'lds-ring');
      const body = document.getElementById('home');
      body.classList.add('on');
    },
    hideSpinner() {
      const spinner = document.getElementById('spinner');
      spinner.classList.replace('lds-ring', 'spinner-off');
      const body = document.getElementById('home');
      body.classList.remove('on');
    },
    logedIn() {
      this.showSpinner();
      this.$store.dispatch('login', {
        login: this.login,
        password: this.password
      })
      .then(() => {
        this.$store.dispatch("getProfile")
        .then((res) => {
          this.hideSpinner();
          if (res.data.role === "warehouse") {
            this.$router.push("warehouse_home");
          }
          if (res.data.role === "store") {
            this.$router.push("store_home");
          }
        })
      })
      .catch((error) => {
        this.hideSpinner();
        this.error = error.response.data
        const emptyInput = document.querySelectorAll('.required');
          emptyInput.forEach(input => {
              if(input.value === "") {
                  input.classList.add('empty')
              }
          })
      })
    },
    cancelError() {
      const emptyInput = document.querySelectorAll('.required');
      emptyInput.forEach(input => {
          if(input.value !== "") {
              input.classList.remove('empty')
          }
      })
      this.error = ''
    },
  },
  created() {
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.error = {message: 'Votre session a expiré, veuillez vous reconnecter'}
      }
      if(res === 'valid') {
        this.$store.dispatch('getProfile')
        .then((res) => {
          if (res.data.role === "warehouse") {
            this.$router.push("warehouse_home");
          }
          if (res.data.role === "store") {
            this.$router.push("store_home");
          }
        })
      }
    })
  }
}
</script>

<style scoped>
/* Page */
#home{
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(24, 24, 24);
  z-index: 1;
}
#pizza-back{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.3;
}
/* Form */
#form{
  z-index: 1;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 0 0 60px 60px;
}
#logo-main{
  width: 200px;
  margin-top: 60px;
  margin-bottom: 10px;
}
#logo-sp{
  width: 100%;
}
#form-input{
  width: 80%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 60px;
  margin-bottom: 20px;
}
.label-form{
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: 600;
}
.input{
  width: 96%;
  height: 30px;
  margin-bottom: 20px;
  border-radius: 3px;
  border: none;
  padding-left: 10px;
  background-color: rgb(226, 226, 226);
}
input:focus{
  outline: none;
}
.password-box{
  position: relative;
  width: 99%;
  height: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#password-input{
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  background-color: rgb(226, 226, 226);
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 30px;
}
.home-form-password-icon{
  position: absolute;
  height: 50%;
  right: 4%;
  top: 25%;
  cursor: pointer;
}
button{
  font-size: 1.2em;
  margin-top: 20px;
  margin-bottom: 60px;
  padding: 8px 35px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  color: white;
  background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
}
.empty{
  border: solid 2px #ea510b;
}
.error{
  text-align: center;
  color: #ea510b;
  align-self: center;
}
/* Logos */
#logos-1{
  z-index: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
.logo-login-1{
  width: 120px;
  margin-left: 10px;
  margin-right: 10px;
}
#logos-2{
  display: none;
}
/* Responsiv */
@media (min-width: 700px) {
  #form{
    position: absolute;
    right: 0;
    height: 100%;
    border-radius: unset;
  }
  #logo-main{
    margin-top: 100px;
    margin-bottom: 30px;
  }
  #logos-1{
    display: none;
  }
  #logos-2{
    z-index: 1;
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .logo-login-2{
    width: 60px;
    margin-right: 30px;
  }
}
</style>

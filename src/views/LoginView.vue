<template>
  <div id="home">
    <img src="../assets/pizza-back.jpg" alt="" id="pizza-back">
    <div id="logos">
      <img src="../assets/logo-sp-petit.png" alt="" class="logo-login">
      <img src="../assets/logo-mburger-petit.webp" alt="" class="logo-login">
    </div>
    <div id="form">
      <label>Identifiant</label>
      <input v-model="login" type="text">
      <label>Mot de Passe</label>
      <input v-model="password" type="password">
      <div v-if="error" id="error">{{ error.message }}</div>
      <button @click="logedIn()" id="button-login">Connexion</button>
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
      password: ""
    }
  },
  computed: {
      ...mapGetters(['getProfile'])
  },
  methods: {
    logedIn() {
      this.$store.dispatch('login', {
        login: this.login,
        password: this.password
      })
      .then(() => {
        this.$store.dispatch("getProfile")
        .then((res) => {
          if (res.data.role === "warehouse") {
            this.$router.push("warehouse_home");
          }
          if (res.data.role === "store") {
            this.$router.push("store_home");
          }
        })
      })
      .catch((error) => {
        this.error = error.response.data
      })
    }
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
/* Logos */
#logos{
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
.logo-login{
  width: 30%;
}
/* Form */
#form{
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
label{
  color: white;
  margin-bottom: 10px;
}
input{
  width: 200px;
  height: 25px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
}
button{
  font-size: 1.3em;
  margin-top: 20px;
  padding: 5px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(51, 200, 79);
  color: white;
}
#error{
  color: white;
}
</style>

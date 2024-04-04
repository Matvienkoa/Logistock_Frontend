<template>
<Header :title="'Mot de Passe'"/>
  <div class="back-head">
    <router-link :to="{name: 'warehouse_admin_login', params: {id: this.$route.params.id}}" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <p class="label-form">Mot de Passe Actuel<span class="star">*</span></p>
      <div class="password-box">
        <input class="required" @input="cancelError()" v-model="actualPassword" type="password" placeholder="Mot de passe actuel" id="password-input" />
        <img crossorigin="anonymous" v-if="modePassword === 'hidden'" @click="showPassword()" class="home-form-password-icon" alt="" src="../assets/eye.svg">
        <img crossorigin="anonymous" v-if="modePassword === 'visible'" @click="hidePassword()" class="home-form-password-icon" alt="" src="../assets/eye-slash.svg">
      </div>
      <p class="label-form">Nouveau Mot de Passe<span class="star">*</span></p>
      <div class="password-box">
        <input class="required" @input="cancelError()" v-model="password" type="password" placeholder="Nouveau Mot de passe" id="password-input-2" />
        <img crossorigin="anonymous" v-if="modePassword2 === 'hidden'" @click="showPassword2()" class="home-form-password-icon" alt="" src="../assets/eye.svg">
        <img crossorigin="anonymous" v-if="modePassword2 === 'visible'" @click="hidePassword2()" class="home-form-password-icon" alt="" src="../assets/eye-slash.svg">
      </div>
      <p class="label-form">Répéter le Mot de Passe<span class="star">*</span></p>
      <div class="password-box">
        <input class="required" @input="cancelError()" v-model="password2" type="password" placeholder="Nouveau Mot de Passe" id="password-input-3" />
        <img crossorigin="anonymous" v-if="modePassword3 === 'hidden'" @click="showPassword3()" class="home-form-password-icon" alt="" src="../assets/eye.svg">
        <img crossorigin="anonymous" v-if="modePassword3 === 'visible'" @click="hidePassword3()" class="home-form-password-icon" alt="" src="../assets/eye-slash.svg">
      </div>
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="editPassword()" class="valid-add-button">Modifier le mot de passe</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';

export default {
  name: 'warehouse_admin_password',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      error: "",
      actualPassword: "",
      password: "",
      password2: "",
      modePassword: 'hidden',
      modePassword2: 'hidden',
      modePassword3: 'hidden'
    }
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
    showPassword2() {
      this.modePassword2 = 'visible'
      const input = document.getElementById('password-input-2')
      input.type = 'text'
    },
    hidePassword2() {
      this.modePassword2 = 'hidden'
      const input = document.getElementById('password-input-2')
      input.type = 'password'
    },
    showPassword3() {
      this.modePassword3 = 'visible'
      const input = document.getElementById('password-input-3')
      input.type = 'text'
    },
    hidePassword3() {
      this.modePassword3 = 'hidden'
      const input = document.getElementById('password-input-3')
      input.type = 'password'
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
    editPassword() {
        instance.put(`/user/password/${this.$route.params.id}`, {
            actualPassword: this.actualPassword,
            password : this.password,
            password2: this.password2,
        })
        .then((res) => {
            if(res.status === 200) {
                this.$router.push(`/warehouse_admin_login/${this.$route.params.id}`)
            }
        })
        .catch((error) => {
            this.error = error.response.data;
            const emptyInput = document.querySelectorAll('.required');
            emptyInput.forEach(input => {
                if(input.value === "") {
                    input.classList.add('empty')
                }
            })
        })
    }
  },
  created: function () {
      this.$store.dispatch('checkToken')
      .then((res) => {
        if(res === 'expired') {
          this.$router.push('/')
        }
      })
      this.$store.dispatch('getProfile')
      .then((res) => {
        if(res.data) {
          if(res.data.role !== 'warehouse') {
            this.$router.push('/store_home')
          }
          if(res.data.role === 'warehouse' && res.data.roleNumber !== 'admin') {
            this.$router.push('/warehouse_home')
          }
        } else {
          this.$router.push('/')
        }
      })
  },
}
</script>

<style scoped>
input:focus{
  outline: none;
}
.password-box{
  position: relative;
  width: 98%;
  height: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#password-input, #password-input-2, #password-input-3{
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  background-color: rgb(226, 226, 226);
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 40px;
}
.home-form-password-icon{
  position: absolute;
  height: 50%;
  right: 10px;
  top: 25%;
  cursor: pointer;
}
.error{
    margin-bottom: 20px;
}
</style>
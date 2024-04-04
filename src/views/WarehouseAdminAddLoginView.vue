<template>
<Header :title="'Créer'"/>
  <div class="back-head">
    <router-link to="/warehouse_admin_logins" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <p class="label-form">Compte d'accès<span class="star">*</span></p>
      <select @change="cancelError()" class="input required" v-model="role" name="role" id="select-account">
        <option value="warehouse">Admin</option>
        <option value="store">Point de vente</option>
      </select>
      <p class="label-form">Rôle<span class="star">*</span></p>
      <select @change="cancelError()" class="input required" v-model="roleNumber" name="roleNumber" id="select-role">
        <option v-if="role === 'warehouse'" value="admin">Admin</option>
        <option v-if="role === 'warehouse'" value="prepa">Préparation</option>
        <option v-if="role === 'store'" value="S01">SP Craon</option>
        <option v-if="role === 'store'" value="S02">SP Evron</option>
        <option v-if="role === 'store'" value="S03">SP Bonchamp</option>
        <option v-if="role === 'store'" value="S04">SP Ernée</option>
        <option v-if="role === 'store'" value="S05">SP Laval</option>
        <option v-if="role === 'store'" value="S06">SP Mayenne</option>
        <option v-if="role === 'store'" value="S07">SP Vitré</option>
        <option v-if="role === 'store'" value="S08">SP Château Gontier</option>
        <option v-if="role === 'store'" value="S09">MB Evron</option>
      </select>
      <p class="label-form">Login<span class="star">*</span></p>
      <input class="input required" id="input-login" @input="cancelError()" v-model="login" type="text" placeholder="Identifiant" />
      <p class="label-form">E Mail<span class="star">*</span></p>
      <input class="input required" id="input-mail" @input="cancelError()" v-model="email" type="mail" placeholder="E mail" />
      <p class="label-form">Mot de passe<span class="star">*</span></p>
      <div class="password-box">
        <input class="required" @input="cancelError()" v-model="password" type="password" placeholder="Mot de passe" id="password-input" />
        <img crossorigin="anonymous" v-if="modePassword === 'hidden'" @click="showPassword()" class="home-form-password-icon" alt="" src="../assets/eye.svg">
        <img crossorigin="anonymous" v-if="modePassword === 'visible'" @click="hidePassword()" class="home-form-password-icon" alt="" src="../assets/eye-slash.svg">
      </div>
      <p class="label-form">Répétez le mot de passe<span class="star">*</span></p>
      <div class="password-box">
        <input class="required" @input="cancelError()" v-model="password2" type="password" placeholder="Mot de passe" id="password-input-2" />
        <img crossorigin="anonymous" v-if="modePassword2 === 'hidden'" @click="showPassword2()" class="home-form-password-icon" alt="" src="../assets/eye.svg">
        <img crossorigin="anonymous" v-if="modePassword2 === 'visible'" @click="hidePassword2()" class="home-form-password-icon" alt="" src="../assets/eye-slash.svg">
      </div>
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="addLogin()" class="valid-add-button">Créer le compte</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';

export default {
    name: 'warehouse_admin_add_login',
    components: {
      Header,
      Footer,
    },
    data() {
        return {
            error: "",
            role: "",
            roleNumber: "",
            email: "",
            login: "",
            password: "",
            password2: "",
            modePassword: 'hidden',
            modePassword2: 'hidden'
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
        cancelError() {
          const emptyInput = document.querySelectorAll('.required');
            emptyInput.forEach(input => {
                if(input.value !== "") {
                    input.classList.remove('empty')
                }
            })
            this.error = ''
        },
        addLogin() {
            instance.post('/auth/signup', {
                role: this.role,
                roleNumber : this.roleNumber,
                email: this.email,
                login: this.login,
                password: this.password,
                password2: this.password2
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$router.push('/warehouse_admin_logins')
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
    created() {
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
    }
}
</script>

<style>
.valid-add-button{
  background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  height: 30px;
}
</style>

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
#password-input, #password-input-2{
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
  margin-bottom: 10px;
}
</style>
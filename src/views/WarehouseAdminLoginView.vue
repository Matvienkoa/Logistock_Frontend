<template>
<Header :title="'Compte'"/>
  <div class="back-head">
    <router-link to="/warehouse_admin_logins" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <p class="label-form">Compte d'accès<span class="star">*</span></p>
      <select @change="updateSelect()" @input="cancelError()" class="input required" v-model="role" name="role" id="select-account">
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
        <option v-if="role === 'store'" value="S09">MB Craon</option>
      </select>
      <p class="label-form">Login<span class="star">*</span></p>
      <input id="input-login" class="input required" @input="cancelError()" v-model="login" type="text" placeholder="Identifiant" />
      <p class="label-form">E Mail<span class="star">*</span></p>
      <input id="input-mail" class="input required" @input="cancelError()" v-model="email" type="mail" placeholder="E mail" />
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="editLogin()" class="valid-add-button">Modifier le compte</button>
      <router-link :to="{name: 'warehouse_admin_password', params: {id: this.$route.params.id}}">
        <button class="search-button">Modifier le mot de passe</button>
      </router-link>
      <div class="delete-button" @click="switchToConfirm()">Supprimer</div>
      <div class="popup-confirm-page" v-if="mode === 'confirm'">
        <div class="popup-confirm-box">
          <p class="popup-confirm-text">Supprimer le compte?</p>
          <img src="../assets/danger-red.svg" alt="" class="popup-danger">
          <div class="popup-choice-box">
              <button class="popup-confirm-button" @click="deleteLogin()">Supprimer</button>
              <div class="popup-cancel-button" @click="cancelConfirm()">Annuler</div>
          </div>
        </div>
    </div>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'warehouse_admin_login',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      mode: "",
      error: "",
      role: "",
      roleNumber: "",
      email: "",
      login: ""
    }
  },
  computed: {
    ...mapGetters(['getLogin'])
  },
  methods: {
    cancelError() {
      const emptyInput = document.querySelectorAll('.required');
        emptyInput.forEach(input => {
            if(input.value !== "") {
                input.classList.remove('empty')
            }
        })
        this.error = ''
    },
    updateSelect() {
      this.roleNumber = ""
    },
    editLogin() {
        instance.put(`/user/${this.$route.params.id}`, {
            role: this.role,
            roleNumber : this.roleNumber,
            email: this.email,
            login: this.login,
        })
        .then((res) => {
            if(res.status === 200) {
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
    },
    switchToConfirm() {
        this.mode = 'confirm'
    },
    cancelConfirm() {
        this.mode = ''
    },
    deleteLogin() {
      instance.delete(`/user/${this.$route.params.id}`)
      .then((res) => {
          if(res.status === 200) {
              this.$router.push(`/warehouse_admin_logins`)
          }
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
      this.$store.dispatch('getLogin', this.$route.params.id)
      .then((res) => {
        this.role = res.data.role
        this.roleNumber = res.data.roleNumber
        this.email = res.data.email
        this.login = res.data.login
      })
  },
}
</script>

<style scoped>
.valid-add-button{
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 1em;
}
.search-button{
  font-size: 0.9em;
  padding: 5px 10px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  color: white;
  background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
  margin-bottom: 20px;
}
.delete-button{
  font-size: 0.9em;
}
</style>
<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Fournisseur'"/>
  <div class="back-head">
    <router-link to="/warehouse_suppliers" class="back-button">Retour</router-link>
  </div>
  <div class="page-mono">
    <div class="page-mono-bloc">
      <h1 class="page-mono-title">{{getSupplier.name}}</h1>
      <div class="page-mono-infos">
        <p>Numéro client : {{getSupplier.number}}</p>
        <p>Siret : {{getSupplier.siret}}</p>
        <p>{{getSupplier.adress}}</p>
        <p>{{getSupplier.adress2}}</p>
        <p>{{getSupplier.postalCode}}</p>
        <p>{{getSupplier.city}}</p>
        <p>Contact : {{getSupplier.contact}}</p>
        <p>{{getSupplier.tel}}</p>
        <p>{{getSupplier.mail}}</p>
        <p>Commentaire : {{getSupplier.comment}}</p>
      </div>
    </div>
    <div v-if="getSupplier.name !== 'Autre'" class="page-mono-buttons">
      <router-link v-if="getSupplier && getSupplier.id" :to="{name: 'warehouse_edit_supplier', params: {id: getSupplier.id}}" class="edit-button">
        Modifier
      </router-link>
      <div class="delete-button" @click="switchToConfirm()">Supprimer</div>
    </div>
    <div class="popup-confirm-page" v-if="mode === 'confirm'">
      <div class="popup-confirm-box">
        <p class="popup-confirm-text">Supprimer le fournisseur?</p>
        <img src="../assets/danger-red.svg" alt="" class="popup-danger">
        <p class="popup-confirm-text">Attention, tous les produits liés à ce fournisseur se retrouveront "sans fournisseur"!</p>
        <div class="popup-choice-box">
            <button class="popup-confirm-button" @click="deleteSupplier()">Supprimer</button>
            <div class="popup-cancel-button" @click="cancelConfirm()">Annuler</div>
        </div>
      </div>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_supplier',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          mode: "",
          isLoading: false,
      }
  },
  computed: {
        ...mapGetters(['getSupplier'])
  },
  methods: {
    switchToConfirm() {
        this.mode = 'confirm'
    },
    cancelConfirm() {
        this.mode = ''
    },
    deleteSupplier() {
      instance.delete(`/supplier/${this.$route.params.id}`)
      .then((res) => {
          if(res.status === 200) {
              this.$router.push(`/warehouse_suppliers`)
          }
      })
    }
  },
  created: function () {
    this.isLoading = true;
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
      this.$store.dispatch('getSupplier', this.$route.params.id)
      .then(() => {
        this.isLoading = false;
      })
  },
}
</script>

<style>
.page-mono{
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.page-mono-bloc{
  width: 95%;
  max-width: 700px;
  padding: 20px 0;
}
.page-mono-title{
  width: 100%;
  text-align: center;
}
.page-mono-infos{
  width: 90%;
  margin: auto;
  margin-top: 10px;
  padding: 10px 0;
}
.page-mono-infos p{
  margin-left: 10px;
}
.page-mono-buttons{
  width: 95%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.edit-button{
  background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
  text-decoration: none;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
}
.delete-button{
  background-color: #ea510b;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
}

.popup-confirm-page{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(179, 179, 179, 0.829);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-confirm-box{
  position: absolute;
  background-color: white;
  width: 90%;
  max-width: 400px;
  margin: auto;
  padding: 30px 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.popup-confirm-text{
  width: 100%;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
}
.popup-choice-box{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.popup-confirm-button{
  background-color: #ea510b;
  padding: 5px 10px;
  margin-right: 5px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;
}
.popup-cancel-button{
  cursor: pointer;
  margin-left: 5px;
  font-weight: 600;
}
.popup-danger{
  width: 40px;
  margin-bottom: 10px;
}
.show-confirm{
  margin-top: 15px;
  width: 80%;
}
.confirm-text{
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 5px;
  font-weight: bold;
  color: #ea510b;
}
.choice-box{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.confirm-button{
  background-color: #ea510b;
  padding: 5px 10px;
  margin-right: 5px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;
}
.cancel-button{
  cursor: pointer;
  margin-left: 5px;
  font-weight: 600;
}
</style>

<style scoped>
.edit-button{
  margin-right: 10px;
}
</style>
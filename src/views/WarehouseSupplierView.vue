<template>
<Header :title="'Fournisseur'"/>
  <div class="back-head">
    <router-link to="/warehouse_suppliers" class="back-button">Retour</router-link>
  </div>
  <div class="page-mono">
    <div class="page-mono-bloc">
      <h1 class="page-mono-title">{{getSupplier.name}}</h1>
      <div class="page-mono-infos">
        <p>{{getSupplier.adress}}</p>
        <p>{{getSupplier.adress2}}</p>
        <p>{{getSupplier.postalCode}}</p>
        <p>{{getSupplier.city}}</p>
        <p v-if="getSupplier.contact">Contact : {{getSupplier.contact}}</p>
        <p>{{getSupplier.tel}}</p>
        <p>{{getSupplier.mail}}</p>
      </div>
    </div>
    <div v-if="getSupplier.name !== 'Autre'" class="page-mono-buttons">
      <router-link v-if="getSupplier && getSupplier.id" :to="{name: 'warehouse_edit_supplier', params: {id: getSupplier.id}}" class="edit-button">
        Modifier
      </router-link>
      <div class="delete-button" @click="switchToConfirm()">Supprimer</div>
    </div>
    <div class="show-confirm" v-if="mode === 'confirm'">
        <p class="confirm-text">Supprimer le fournisseur?</p>
        <p class="confirm-text">Attention, tous les produits liés à ce fournisseur se retrouveront "sans fournisseur"!</p>
        <div class="choice-box">
            <button class="confirm-button" @click="deleteSupplier()">Supprimer</button>
            <div class="cancel-button" @click="cancelConfirm()">Annuler</div>
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
          mode: ""
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
        } else {
          this.$router.push('/')
        }
      })
      this.$store.dispatch('getSupplier', this.$route.params.id)
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
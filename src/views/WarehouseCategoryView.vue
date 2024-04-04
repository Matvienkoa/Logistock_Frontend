<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Catégorie'"/>
  <div class="back-head">
    <router-link to="/warehouse_categories" class="back-button">Retour</router-link>
  </div>
  <div class="page-mono">
    <div class="page-mono-bloc">
      <h1 class="page-mono-title">{{getCategory.name}}</h1>
    </div>
    <div class="page-mono-buttons">
      <router-link v-if="getCategory && getCategory.id" :to="{name: 'warehouse_edit_category', params: {id: getCategory.id}}" class="edit-button">
        Modifier
      </router-link>
      <div class="delete-button" @click="switchToConfirm()">Supprimer</div>
    </div>
    <div class="popup-confirm-page" v-if="mode === 'confirm'">
      <div class="popup-confirm-box">
        <p class="popup-confirm-text">Supprimer la catégorie?</p>
        <img src="../assets/danger-red.svg" alt="" class="popup-danger">
        <p class="popup-confirm-text">Attention, tous les produits liés à cette catégorie se retrouveront "sans catégorie"!</p>
        <div class="popup-choice-box">
            <button class="popup-confirm-button" @click="deleteCategory()">Supprimer</button>
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
  name: 'warehouse_category',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          mode: "",
          isLoading: false
      }
  },
  computed: {
        ...mapGetters(['getCategory'])
  },
  methods: {
    switchToConfirm() {
        this.mode = 'confirm'
    },
    cancelConfirm() {
        this.mode = ''
    },
    deleteCategory() {
      instance.delete(`/category/${this.$route.params.id}`)
      .then((res) => {
          if(res.status === 200) {
              this.$router.push(`/warehouse_categories`)
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
      this.$store.dispatch('getCategory', this.$route.params.id)
      .then(() => {
        this.isLoading = false;
      })
  },
}
</script>

<style>
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
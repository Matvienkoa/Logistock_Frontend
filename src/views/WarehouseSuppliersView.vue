<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Fournisseurs'"/>
  <div class="back-head">
    <router-link to="/warehouse_stock" class="back-button">Retour</router-link>
    <router-link to="/warehouse_add_supplier" class="cart-button">Créer un fournisseur</router-link>
  </div>
  <div class="page">
    <div class="no-result" v-if="getSuppliers.length === 0">Vous n'avez pas enregistré de Fournisseur</div>
    <router-link v-for="supplier in getSuppliers" :key="supplier.id" :to="{name: 'warehouse_supplier', params: {id: supplier.id}}" class="menu-links-list">
      <div class="menu-bloc-list">
        <div class="title-list">{{ supplier.name }}</div> 
      </div>
    </router-link>
  </div>
  <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_suppliers',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
        ...mapGetters(['getSuppliers'])
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
        this.$store.dispatch('getSuppliers')
        .then(() => {
          this.isLoading = false;
        })
    },
}
</script>

<style scoped>
.menu-links-list{
  max-width: 600px;
}
</style>

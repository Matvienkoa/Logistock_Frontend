<template>
<Header :title="'Fournisseurs'"/>
  <div class="back-head">
    <router-link to="/warehouse_stock" class="back-button">retour</router-link>
    <router-link to="/warehouse_add_supplier" class="cart-button">Ajouter un fournisseur</router-link>
  </div>
  <div class="page">
    <div class="no-result" v-if="getSuppliers.length === 0">Vous n'avez pas enregistré de Fournisseur</div>
    <router-link v-for="supplier in getSuppliers" :key="supplier.id" :to="{name: 'warehouse_supplier', params: {id: supplier.id}}" class="menu-links-list">
      <div class="menu-bloc-list">
        <div class="title-list">{{ supplier.name }}</div> 
      </div>
    </router-link>
  </div>
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
  computed: {
        ...mapGetters(['getSuppliers'])
    },
    created: function () {
        this.$store.dispatch('getSuppliers')
    },
}
</script>

<style scoped>
@media (min-width: 700px) {
  .page{
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}
</style>

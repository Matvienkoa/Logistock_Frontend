<template>
<Header :title="'Fournisseurs'"/>
  <div class="about">

    <router-link to="/warehouse_add_supplier" class="menu-links">
      <div class="menu-bloc">
        Ajouter un fournisseur
      </div>
    </router-link>

    <div v-for="supplier in getSuppliers" :key="supplier.id">
      <router-link v-if="supplier && supplier.id" :to="{name: 'warehouse_supplier', params: {id: supplier.id}}" class="">{{ supplier.name }}</router-link>
    </div>
    
    <router-link to="/warehouse_stock">
        retour
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
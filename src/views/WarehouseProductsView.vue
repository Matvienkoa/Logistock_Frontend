<template>
<Header :title="'Références'"/>
  <div class="about">

    <router-link to="/warehouse_add_product" class="menu-links">
      <div class="menu-bloc">
        Ajouter un produit
      </div>
    </router-link>

    <div v-for="product in getProducts" :key="product.id">
      <router-link v-if="product && product.id" :to="{name: 'warehouse_product', params: {id: product.id}}" class="">{{ product.name }}</router-link>
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
  name: 'warehouse_products',
  components: {
    Header,
    Footer,
  },
  computed: {
      ...mapGetters(['getProducts'])
  },
  created: function () {
      this.$store.dispatch('getProducts')
  },
}
</script>
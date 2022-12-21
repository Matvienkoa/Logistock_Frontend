<template>
<Header :title="'Stocks'"/>
  <div class="back-head">
    <router-link to="/warehouse_home" class="back-button">retour</router-link>
  </div>
  <div class="page">
    <router-link to="/warehouse_suppliers" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/supplier.jpg" alt="" class="img-back">
        <div class="title-card">Voir mes fournisseurs</div>
      </div>
    </router-link>
    <router-link to="/warehouse_products" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/products.jpg" alt="" class="img-back">
        <div class="title-card">Voir mes produits</div>
      </div>
    </router-link>
    <router-link to="/warehouse_inventory" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/stocks.jpg" alt="" class="img-back">
        <div class="title-card">Gestion de mes stocks</div>
      </div>
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'

export default {
  name: 'warehouse_stock',
  components: {
    Header,
    Footer,
  }
}
</script>
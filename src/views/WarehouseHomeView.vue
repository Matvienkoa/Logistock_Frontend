<template>
<Header :title="'Accueil'"/>
  <div class="page">
    <router-link to="/warehouse_stock" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/stocks.jpg" alt="" class="img-back">
        <div class="title-card">Mes Stocks</div> 
      </div>
    </router-link>

    <router-link to="/warehouse_preparation" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/preparation.jpg" alt="" class="img-back">
        <div class="title-card">Préparation</div> 
      </div>
    </router-link>

    <router-link to="/warehouse_admin" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/admin.jpg" alt="" class="img-back">
        <div class="title-card">Admin</div>
      </div>
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'

export default {
  name: 'warehouse_home',
  components: {
    Header,
    Footer,
  }
}
</script>

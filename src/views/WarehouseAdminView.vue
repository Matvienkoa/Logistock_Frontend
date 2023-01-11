<template>
<Header :title="'Admin'"/>
  <div class="back-head">
    <router-link to="/warehouse_home" class="back-button">Retour</router-link>
  </div>
  <div class="page">
    <router-link to="/warehouse_admin_stores" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/store.webp" alt="" class="img-back">
        <div class="title-card">Mes Points de vente</div>
      </div>
    </router-link>

    <router-link to="/warehouse_admin_sales" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/sales.jpg" alt="" class="img-back">
        <div class="title-card">Mes ventes</div>
      </div>
    </router-link>

    <router-link to="/warehouse_admin_stocks" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/value.jpg" alt="" class="img-back">
        <div class="title-card">Valeur Marchande</div>
      </div>
    </router-link>
  </div>
  <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'

export default {
  name: 'warehouse_admin',
  components: {
    Header,
    Footer,
  },
}
</script>
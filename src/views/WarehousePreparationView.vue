<template>
<Header :title="'Préparation'"/>
  <div class="back-head">
    <router-link to="/warehouse_home" class="back-button">Retour</router-link>
  </div>
  <div class="page">
    
    <router-link to="/warehouse_preparation_new_orders" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/order-pending.jpg" alt="" class="img-back">
        <div class="title-card">Commandes reçues</div>
      </div>
    </router-link>
    <router-link to="/warehouse_preparation_validated_orders" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/order-validated.jpg" alt="" class="img-back">
        <div class="title-card">Commandes validées</div>
      </div>
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'

export default {
  name: 'warehouse_preparation',
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>

</style>
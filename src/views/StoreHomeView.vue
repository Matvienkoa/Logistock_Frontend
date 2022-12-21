<template>
<Header :title="'Accueil'"/>
  <div class="page">
    <router-link to="/store_products" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/bag.jpg" alt="" class="img-back">
        <div class="title-card">Commander</div>
      </div>
    </router-link>
    <router-link to="/store_orders" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/order-1.jpg" alt="" class="img-back">
        <div class="title-card">Mes Commandes</div>
      </div>
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'

export default {
  name: 'store_home',
  components: {
    Header,
    Footer,
  },
  created() {
    this.$store.dispatch('getProfile')
  }
}
</script>

<style scoped>

</style>
<template>
<Header :title="'Welcome'"/>
  <div class="page">
    <router-link to="/store_products" class="menu-links">
      <div class="menu-bloc">
        Catalogue
      </div>
    </router-link>

    <router-link to="/store_orders" class="menu-links">
      <div class="menu-bloc">
        Commandes
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
/* Page */
.page{
  width: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
/* Links */
.menu-bloc{
  width: 200px;
  height: 100px;
  background-color: rgb(221, 221, 221);
  
}
</style>
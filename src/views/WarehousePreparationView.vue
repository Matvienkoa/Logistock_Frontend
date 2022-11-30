<template>
<Header :title="'Préparation'"/>
  <div class="page">
    
    <router-link to="/warehouse_preparation_new_orders" class="menu-links">
      <div class="menu-bloc">
        Commandes reçues
      </div>
    </router-link>

    <router-link to="/warehouse_preparation_validated_orders" class="menu-links">
      <div class="menu-bloc">
        Commandes validées
      </div>
    </router-link>

    <router-link to="/warehouse_home">
        retour
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
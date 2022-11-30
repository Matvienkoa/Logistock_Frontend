<template>
<Header :title="'Stock'"/>
  <div class="page">

    <router-link to="/warehouse_suppliers" class="menu-links">
      <div class="menu-bloc">
        Voir mes fournisseurs
      </div>
    </router-link>

    <router-link to="/warehouse_products" class="menu-links">
      <div class="menu-bloc">
        Voir mes produits
      </div>
    </router-link>

    <router-link to="/warehouse_inventory" class="menu-links">
      <div class="menu-bloc">
        Gestion de mes stocks
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
  name: 'warehouse_stock',
  components: {
    Header,
    Footer,
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
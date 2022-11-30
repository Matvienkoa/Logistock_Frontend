<template>
<Header :title="'Admin'"/>
  <div class="page">
    <router-link to="/warehouse_admin_stores" class="menu-links">
      <div class="menu-bloc">
        Mes Points de vente
      </div>
    </router-link>

    <router-link to="/warehouse_admin_sales" class="menu-links">
      <div class="menu-bloc">
        Mes ventes
      </div>
    </router-link>

    <router-link to="/warehouse_admin_stocks" class="menu-links">
      <div class="menu-bloc">
        Valeur Marchande
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
  name: 'warehouse_admin',
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
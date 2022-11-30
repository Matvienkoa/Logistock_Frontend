<template>
<Header :title="'Welcome'"/>
  <div class="page">

    <router-link to="/warehouse_stock" class="menu-links">
      <div class="menu-bloc">
        Stocks
      </div>
    </router-link>

    <router-link to="/warehouse_preparation" class="menu-links">
      <div class="menu-bloc">
        Préparations
      </div>
    </router-link>

    <router-link to="/warehouse_admin" class="menu-links">
      <div class="menu-bloc">
        Admin
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

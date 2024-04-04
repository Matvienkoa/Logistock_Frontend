<template>
<Header :title="'Accueil'"/>
  <div id="test" class="page">
    <router-link v-if="getProfile.roleNumber === 'admin'" to="/warehouse_stock" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/warehouse.webp" alt="" class="img-back">
        <div class="title-card">Entrepôt</div> 
      </div>
    </router-link>
    <router-link to="/warehouse_preparation" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/preparation.webp" alt="" class="img-back">
        <div class="title-card">Préparation</div> 
      </div>
    </router-link>
    <router-link v-if="getProfile.roleNumber === 'admin'" to="/warehouse_admin" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/admin.webp" alt="" class="img-back">
        <div class="title-card">Admin</div>
      </div>
    </router-link>
  </div>
  <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_home',
  components: {
    Header,
    Footer,
  },
  computed: {
      ...mapGetters(['getProfile'])
  },
  created() {
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.$router.push('/')
      }
    })
    this.$store.dispatch('getProfile')
    .then((res) => {
      if(res.data) {
        if(res.data.role !== 'warehouse') {
          this.$router.push('/store_home')
        }
      } else {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style>
.bottom{
  margin-bottom: 100px;
}
</style>

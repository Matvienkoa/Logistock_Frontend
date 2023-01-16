<template>
<Header :title="'Entrepôt'"/>
  <div class="back-head">
    <router-link to="/warehouse_home" class="back-button">Retour</router-link>
  </div>
  <div class="page">
    <router-link to="/warehouse_suppliers" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/supplier2.webp" alt="" class="img-back">
        <div class="title-card">Fournisseurs</div>
      </div>
    </router-link>
    <router-link to="/warehouse_products" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/products2.webp" alt="" class="img-back">
        <div class="title-card">Références</div>
      </div>
    </router-link>
    <router-link to="/warehouse_inventory" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/stocks.webp" alt="" class="img-back">
        <div class="title-card">Stocks par Référence</div>
      </div>
    </router-link>
    <router-link to="/warehouse_date_stocks" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/date.webp" alt="" class="img-back">
        <div class="title-card">Stocks à dates courtes</div>
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
  name: 'warehouse_stock',
  components: {
    Header,
    Footer,
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
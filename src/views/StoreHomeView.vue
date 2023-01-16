<template>
<Header :title="'Accueil'"/>
  <h1>Bonjour {{getStore.name}} </h1>
  <div class="page">
    <router-link to="/store_products" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/bag.webp" alt="" class="img-back">
        <div class="title-card">Commander</div>
      </div>
    </router-link>
    <router-link to="/store_orders" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/order-1.webp" alt="" class="img-back">
        <div class="title-card">Mes Commandes</div>
      </div>
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'store_home',
  components: {
    Header,
    Footer,
  },
  computed: {
      ...mapGetters(['getStore'])
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
        if(res.data.role !== 'store') {
          this.$router.push('/warehouse_home')
        }
      } else {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style scoped>
h1{
  width: 90%;
  max-width: 600px;
  text-align: center;
  margin: auto;
  margin-top: 30px;
  font-size: 1.5em;
}
.page{
  padding-top: 40px;
}
</style>
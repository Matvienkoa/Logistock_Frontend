<template>
<Header :title="'Préparation'"/>
  <div class="back-head">
    <router-link to="/warehouse_home" class="back-button">Retour</router-link>
  </div>
  <div class="page">
    <router-link to="/warehouse_preparation_new_orders" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/order-pending.webp" alt="" class="img-back">
        <div class="title-card">Commandes reçues<img v-if="ordersPending.length > 0" src="../assets/circle-validated.svg" alt="" class="new-order"></div>
      </div>
    </router-link>
    <router-link to="/warehouse_preparation_validated_orders" class="menu-links">
      <div class="menu-bloc">
        <img src="../assets/order-validated.webp" alt="" class="img-back">
        <div class="title-card">Commandes validées<img v-if="ordersToBill.length > 0" src="../assets/circle-validated.svg" alt="" class="new-order"></div>
      </div>
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_preparation',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          ordersPending: [],
          ordersToBill: []
      }
  },
  computed: {
    ...mapGetters(['getOrdersPending', 'getOrdersToBill'])
  },
  created: function () {
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
    this.$store.dispatch('getOrdersPending')
    .then(() => {
        this.ordersPending = this.getOrdersPending
    })
    this.$store.dispatch('getOrdersToBill')
    .then((res) => {
      this.ordersToBill = res.data
    })
  },
}
</script>

<style scoped>
.new-order{
  position: absolute;
  width: 17px;
  top: -8px;
  right: -6px;
}
</style>
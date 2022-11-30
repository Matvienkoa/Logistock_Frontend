<template>
<Header :title="'Welcome'"/>
  <div class="page">
    <h1>Mes commandes</h1>
    <div v-for="order in getStore.orders" :key="order.id">
      <router-link v-if="order && order.id" :to="{name: 'store_order', params: {id: order.id}}">
        {{order.id}}
        {{order.status}}
      </router-link>
      
    </div>
    <router-link to="/store_home">
        retour
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'store_orders',
  components: {
    Header,
    Footer,
  },
  computed: {
      ...mapGetters(['getProfile', 'getStore'])
  },
  created() {
    this.$store.dispatch('getProfile')
  }
}
</script>
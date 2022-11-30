<template>
<Header :title="'Stocks'"/>
  <div class="about">

    <div v-for="product in getProducts" :key="product.id">
      <router-link v-if="product && product.id" :to="{name: 'warehouse_inventory_product', params: {id: product.id}}" class="">
        <div>{{ product.name }}</div>
        <div>{{ getTotalStock(product.stocks) }}</div>
      </router-link>
    </div>
    
    <router-link to="/warehouse_stock">
        retour
    </router-link>

  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_inventory',
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters(['getProducts'])
  },
  methods: {
    getTotalStock(stocks) {
      let totalStock = 0;
      stocks.forEach(stock => {
        totalStock += stock.quantity
      });
      return totalStock
    }
  },
  created: function () {
    this.$store.dispatch('getProducts')
  },
}
</script>
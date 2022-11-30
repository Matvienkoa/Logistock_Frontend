<template>
<Header :title="'Commande'"/>
  <div class="page">
    <h1>Commande N° {{ getOrder.id }}</h1>

    <div v-for="product in products" :key="product.id">
        <div>{{product.name}} Qté demandée : {{product.quantity}}</div>
        <div></div>
    </div>

    <router-link to="/store_orders">
        retour
    </router-link>
    
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
  name: 'store_order',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          products: []
      }
  },
  computed: {
        ...mapGetters(['getOrder'])
  },
  methods: {
    
  },
  created: function () {
      this.$store.dispatch('getOrder', this.$route.params.id)
      .then((res) => {
        res.data.orderDetails.forEach(detail => {
            instance.get(`/product/${detail.productId}`)
            .then((res) => {
                res.data.quantity = detail.quantity
                this.products.push(res.data)
            })
        });
      })
  },
}
</script>
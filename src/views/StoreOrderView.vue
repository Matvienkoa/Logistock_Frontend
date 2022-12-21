<template>
<Header :title="'Commande'"/>
  <div class="back-head">
    <router-link to="/store_orders" class="back-button">retour</router-link>
  </div>
  <div class="page">
    <div class="page-products">
      <div v-for="product in products" :key="product.id" class="bloc-card">
          <div class="bloc-card-top">
            <div class="bloc-card-image-box">
              <img :src="product.image" alt="" class="bloc-card-image">
            </div>
            <div class="quantity-in-cart">
              <div class="quantity-box">
                <div class="quantity">{{product.quantity}}</div>
                <div v-if="status=== 'pending'" class="quantity-infos">Qté. demandée </div>
                <div v-if="status=== 'validated'" class="quantity-infos">Qté. livrée </div>
                
              </div>
            </div>
          </div>
          <div class="bloc-card-infos-box">
            <p class="name">{{ product.name }}</p>
            <p>Réf. : {{ product.reference }}</p>
            <p>Colisage : {{ product.packaging }} / Colis</p>
            <p>Format : {{ product.size }}</p>
          </div>
      </div>
    </div>
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
          products: [],
          status: ""
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
        this.status = res.data.status
        res.data.orderDetails.forEach(detail => {
            instance.get(`/product/${detail.productId}`)
            .then((res) => {
                console.log(res)
                res.data.quantity = detail.quantity
                this.products.push(res.data)
            })
        });
      })
  },
}
</script>

<style scoped>
.page-products{
  padding-top: 30px;
}
.quantity-in-cart{
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100px;
}
.quantity-box{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: green;
  margin-top: 10px;
}
.quantity-infos{
  font-size: 0.8em;
}
.quantity{
  font-size: 2.2em;
  font-weight: 600;
  margin-left: 5px;
}
.name{
  text-align: center;
  font-size: 1.4em;
  margin-bottom: 10px;
}
</style>
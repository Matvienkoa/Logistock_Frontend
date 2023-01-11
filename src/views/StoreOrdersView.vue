<template>
<Header :title="'Mes Commandes'"/>
  <div class="back-head">
    <router-link to="/store_home" class="back-button">Retour</router-link>
  </div>
  <div class="page">
  
    <router-link class="store-orders" v-for="order in getStore.orders" :key="order.id" :to="{name: 'store_order', params: {id: order.id}}">
      <div class="prepa-orders-infos">
          <p class="order-date">Le : <span class="bold">{{moment(order.createdAt).format('L')}}</span></p>
          <p>N° : <span class="bold">{{order.id}}</span></p>
          <p>Livraison : <span class="bold">{{order.delivery}}</span></p>
      </div>
      
      <div class="order-status" v-if="order.status === 'validated'">
        Validée
        <img class="circle-order" src="../assets/circle-validated.svg" alt="">
      </div>
      <div class="order-status" v-if="order.status === 'pending'">
        En attente
        <img class="circle-order" src="../assets/circle-pending.svg" alt="">
      </div>
    </router-link>
  </div>
  <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'store_orders',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      moment: moment
    }
  },
  computed: {
      ...mapGetters(['getProfile', 'getStore'])
  },
  created() {
    this.$store.dispatch('getProfile')
  }
}
</script>

<style>
.store-orders{
  width: 80%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  padding: 10px;
  text-decoration: none;
  color: black;
  border-radius: 5px;
}
.order-date{
  margin-right: 10px;
}
.order-status{
  text-align: right;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.circle-order{
  width: 17px;
  margin-left: 10px;
}
</style>
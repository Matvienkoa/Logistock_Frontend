<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Mes Commandes'"/>
  <div class="back-head">
    <router-link to="/store_home" class="back-button">Retour</router-link>
  </div>
  <div class="page">
    <input @change="updateOrders()" v-model="month" type="month" name="" class="date-input">
    <div v-if="orders.length <= 0">Vous n'avez pas encore de commande validée!</div>
    <router-link class="store-orders" v-for="order in orders" :key="order.id" :to="{name: 'store_order', params: {id: order.id}}">
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
import instance from '@/axios';
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
      moment: moment,
      orders: [],
      month: moment(new Date()).format('yyyy-MM'),
      isLoading: false,
    }
  },
  computed: {
      ...mapGetters(['getProfile', 'getStore'])
  },
  methods: {
    updateOrders() {
      this.isLoading = true;
      instance.post(`/order/store/${this.getStore.id}`, { date: moment(this.month).format() })
      .then((res) => {
        this.orders = res.data
        this.isLoading = false;
      })
    }
  },
  created() {
    this.isLoading = true;
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
      instance.get(`/store/number/${res.data.roleNumber}`)
      .then((res) => {
        instance.post(`/order/store/${res.data.id}`, {
          date: new Date()
        })
        .then((res) => {
          this.orders = res.data
          this.isLoading = false;
        })
      })
    })
  }
}
</script>

<style scoped>
.page{
  flex-direction: column;
  padding-top: 50px;
}
.date-input{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    font-size: 1.2em;
    height: 30px;
    border-radius: 8px;
    border: none;
    padding: 4px 10px;
    margin-bottom: 30px;
}
.date-input::-webkit-calendar-picker-indicator{
    background-color: transparent;
    cursor: pointer;
}
</style>
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
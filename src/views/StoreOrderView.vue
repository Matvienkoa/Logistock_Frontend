<template>
<Header :title="'Commande'"/>
  <div class="back-head">
    <router-link to="/store_orders" class="back-button">Retour</router-link>
  </div>
  <div class="page">
    <div class="page-order-infos">
      <p>Commande N° : <span class="bold">{{getOrder.id}}</span></p>
      <p>Du : <span class="bold">{{moment(getOrder.createdAt).format('L')}}</span></p>
      <p>Mode de livraison : <span class="bold">{{getOrder.delivery}}</span></p>
      <div class="status-order" v-if="getOrder.status === 'validated'">Statut : Validée <img class="circle-store-order" src="../assets/circle-validated.svg" alt=""></div>
      <div class="status-order" v-if="getOrder.status === 'pending'">Statut : En attente <img class="circle-store-order" src="../assets/circle-pending.svg" alt=""></div>
      <p>Demandeur : {{getOrder.applicant}}</p>
      <p v-if="getOrder.commentStore">Note à la commande : {{getOrder.commentStore}}</p>
      <p v-if="getOrder.commentWarehouse">Réponse : {{getOrder.commentWarehouse}}</p>
    </div>
    <div class="page-products">
      <div v-for="product in products" :key="product.id" class="bloc-card">
          <div v-if="product.id !== 'deleted'" class="bloc-card-top">
            <div class="bloc-card-image-box">
              <img crossorigin="anonymous" v-if="product.image" :src="product.image" alt="" class="bloc-card-image">
              <img crossorigin="anonymous" v-if="!product.image" src="../assets/3.webp" alt="" class="bloc-card-image no-pic">
            </div>
            <div class="quantity-in-cart">
              <div class="quantity-box">
                <div class="quantity">{{product.quantity}}</div>
                <div v-if="status=== 'pending'" class="quantity-infos">Qté. demandée </div>
                <div v-if="status=== 'validated'" class="quantity-infos">Qté. livrée </div>
                <div v-if="status=== 'validated'" class="request-infos"><span class="request-number">{{product.request}}</span> commandé(s)</div>
              </div>
            </div>
          </div>
          <div v-if="product.id !== 'deleted'" class="bloc-card-infos-box">
            <p class="name">{{ product.name }}</p>
            <p>Réf. {{ product.reference }}</p>
            <p>Colisage : <span class="bold">{{ product.packaging }}</span> / Colis</p>
            <p>Format : <span class="bold">{{ product.size }}</span></p>
          </div>
          <div v-if="product.id === 'deleted'" class="bloc-card-top-deleted">
            <div class="bloc-card-image-box">
              <img src="../assets/close.svg" alt="" class="bloc-card-image">
            </div>
          </div>
          <div v-if="product.id === 'deleted'" class="bloc-card-infos-box">
            <p class="name-deleted">Produit supprimé</p>
          </div>
      </div>
    </div>
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
  name: 'store_order',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          products: [],
          status: "",
          moment: moment,
      }
  },
  computed: {
        ...mapGetters(['getOrder'])
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
          if(res.data.role !== 'store') {
            this.$router.push('/warehouse_home')
          }
        } else {
          this.$router.push('/')
        }
      })
      this.$store.dispatch('getOrder', this.$route.params.id)
      .then((res) => {
        this.status = res.data.status
        res.data.orderDetails.forEach(detail => {
            instance.get(`/product/${detail.productId}`)
            .then((res) => {
                if(res.data !== null) {
                  res.data.request = detail.requestQuantity
                  res.data.quantity = detail.quantity
                  this.products.push(res.data)
                } else {
                  this.products.push({id: "deleted"})
                }
            })
        });
      })
  },
}
</script>

<style scoped>
.page-order-infos{
  width: 80%;
  max-width: 600px;
}
.status-order{
  display: flex;
  align-items: center;
}
.circle-store-order{
  width: 20px;
  margin-left: 5px;
}
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
  margin-bottom: 10px;
}
.quantity{
  font-size: 2.2em;
  font-weight: 600;
  margin-left: 5px;
}
.request-infos{
  font-size: 0.8em;
}
.request-number{
  font-size: 1.5em;
  font-weight: bold;
}
.name{
  text-align: center;
  font-size: 1.4em;
  margin-bottom: 10px;
}
.bloc-card-top-deleted{
  justify-content: center;
}
.name-deleted{
  text-align: center;
  font-size: 1.4em;
  margin-bottom: 0;
}
</style>
<template>
<Header :title="'Stock Produit'"/>
  <div class="back-head">
    <router-link to="/warehouse_inventory" class="back-button">Retour</router-link>
    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_inventory_add_stock_product', params: {id: getProduct.id}}" class="cart-button">
        Créer un stock
    </router-link>
  </div>
  <div class="page">
    <div v-if="stocks.length <= 0" class="no-stock">
      Ce produit n'a pas de stock disponible
    </div>
    <div v-for="stock in getProduct.stocks" :key="stock.id" class="stocks-bloc">
      <div class="stocks-infos">
        <div class="stocks-infos-date">
          <div>Date d'achat : {{ moment(stock.buyingDate).format('L') }}</div>
          <div>DLUO : {{ moment(stock.dluo).format('L') }}</div>
          <div>Prix d'achat : {{ (stock.buyingPrice/100).toFixed(2) }} €</div>
        </div>
        <div class="stocks-infos-qty">
          <div class="qty-box">Qté. <div class="qty">{{ stock.quantity }}</div></div>
          <div class="stocks-actions">
            <router-link v-if="stock && stock.id" :to="{name: 'warehouse_inventory_edit_stock_product', params: {id: stock.id}}" class="edit-button-stock">
              <div>Modifier</div> 
            </router-link>
            <img class="delete-button-stock" @click="setDeleteMode(stock.id)" src="../assets/trash.svg" alt="">
          </div>
        </div>
        
      </div>
      
      <div class="show-confirm" v-if="mode === 'delete' && this.stock === stock.id">
        <p class="confirm-text">Supprimer ce stock?</p>
        <div class="choice-box">
          <button class="confirm-button" @click="deleteStock(stock.id)">Supprimer</button>
          <div class="cancel-button" @click="cancelDeleteMode()">Annuler</div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
  name: 'warehouse_inventory_product',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          mode: "",
          stock: "",
          moment: moment,
          stocks: []
      }
  },
  computed: {
        ...mapGetters(['getProduct'])
  },
  methods: {
    setDeleteMode(stock) {
        this.mode = 'delete',
        this.stock = stock
    },
    cancelDeleteMode() {
        this.mode = '',
        this.stock = ''
    },
    deleteStock(stock) {
      instance.delete(`/stock/${stock}`)
      .then((res) => {
        if(res.status === 200) {
              this.$store.dispatch('getProduct', this.$route.params.id)
          }
      })
    }
  },
  created: function () {
      this.$store.dispatch('getProduct', this.$route.params.id)
      .then((res) => {
        this.stocks = res.data.stocks
      })
  },
}
</script>

<style>
.stocks-bloc{
  width: 90%;
  max-width: 700px;
  margin-bottom: 20px;
  padding: 10px 0;
  text-decoration: none;
  color: #000;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stocks-infos{
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stocks-infos-qty{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}
.stocks-actions{
  display: flex;
  margin-top: 10px;

}
</style>

<style scoped>
.edit-button-stock{
  text-decoration: none;
  cursor: pointer;
  color: white;
  background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
  border-radius: 10px;
  border: none;
  font-size: 0.8em;
  padding: 5px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-button-stock{
  height: 23px;
  cursor: pointer;
  margin-left: 13px;
}
.qty-box{
  display: flex;
  align-items: center;
  color: green;
  font-size: 0.8em;
}
.qty{
  font-size: 2.2em;
  font-weight: 600;
}
.no-stock{
  margin-top: 30px;
}
</style>
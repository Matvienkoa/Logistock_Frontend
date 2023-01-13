<template>
<Header :title="'Stock à date'"/>
    <div class="back-head">
        <router-link to="/warehouse_stock" class="back-button">Retour</router-link>
    </div>
    <div class="page">
        <div v-for="stock in stocks" :key="stock.id" class="stocks-bloc">
            <div class="stocks-infos">
                <div class="stocks-infos-date">
                    <div class="name-product">{{stock.productName}}</div>
                    <div class='dluo'>DLUO : {{ moment(stock.dluo).format('L') }}</div>
                    <div>Date d'achat : {{ moment(stock.buyingDate).format('L') }}</div>
                </div>
                <div class="stocks-infos-qty">
                    <div class="qty-box">Qté. <span class="quantity">{{ stock.quantity }}</span></div>
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
    name: 'warehouse_date_stocks',
    components: {
        Header,
        Footer,
    },
    data() {
      return {
          moment: moment,
          stocks: []
      }
    },
    computed: {
        ...mapGetters(['getStocks'])
    },
    created() {
        this.$store.dispatch('getStocks')
        .then((res) => {
            res.data.forEach(stock => {
                instance.get(`/product/${stock.productId}`)
                .then((res) => {
                    stock.productName = res.data.name
                    this.stocks.push(stock)
                })
            })
        })
    }
}
</script>

<style scoped>
.name-product{
    font-weight: 600;
}
.dluo{
    font-weight: 600;
    color: #ea510b;
}
.stocks-infos-qty{
  display: flex;
  font-size: 1.2em;
}
.quantity{
    font-weight: 600;
    font-size: 1.4em;
}
</style>
<template>
<Header :title="'Stock à date'"/>
    <div class="back-head">
        <router-link to="/warehouse_stock" class="back-button">Retour</router-link>
    </div>
    <div class="page-search">
        <div class="search-box">
            <label class="date-label">DLUO : </label>
            <input  v-model="date" type="date" name="" class="date-input">
            <div class="search-button" @click="updateStocks()">Rechercher</div>
        </div>
        <p v-if="stocks.length <= 0" class="no-stock">Aucun stock ne présente de DLUO avant cette date</p>
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
          stocks: [],
          date: ""
      }
    },
    computed: {
        ...mapGetters(['getStocks'])
    },
    methods: {
        updateStocks() {
            this.stocks = []
            this.$store.dispatch('getStocks')
            .then((res) => {
                res.data.forEach(stock => {
                    if(this.date === "") {
                        instance.get(`/product/${stock.productId}`)
                        .then((res) => {
                            stock.productName = res.data.name
                            this.stocks.push(stock)
                            function SortTime(a, b) {
                                let da = new Date(a.dluo);
                                let db = new Date(b.dluo);
                                return (db < da) ? 1 : -1;
                            }
                            this.stocks.sort(SortTime)
                        })
                    } else {
                        let dluo = Date.parse(stock.dluo)
                        let dateSelected = Date.parse(this.date)
                        if(dluo <= dateSelected) {
                            instance.get(`/product/${stock.productId}`)
                            .then((res) => {
                                stock.productName = res.data.name
                                this.stocks.push(stock)
                                function SortTime(a, b) {
                                    let da = new Date(a.dluo);
                                    let db = new Date(b.dluo);
                                    return (db < da) ? 1 : -1;
                                }
                                this.stocks.sort(SortTime)
                            })
                        }
                    }
                })
            })
        }
    },
    created() {
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
        this.$store.dispatch('getStocks')
        .then((res) => {
            res.data.forEach(stock => {
                instance.get(`/product/${stock.productId}`)
                .then((res) => {
                    stock.productName = res.data.name
                    this.stocks.push(stock)
                    function SortTime(a, b) {
                        let da = new Date(a.dluo);
                        let db = new Date(b.dluo);
                        return (db < da) ? 1 : -1;
                    }
                    this.stocks.sort(SortTime)
                })
            })
        })
    }
}
</script>

<style scoped>
.page-search{
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.search-box{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.date-label{
    margin-right: 15px;
    margin-bottom: 10px;
    font-weight: bold;
}
.date-input{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    font-size: 1.2em;
    height: 25px;
    width: 130px;
    border-radius: 8px;
    border: none;
    padding: 4px 10px;
    margin-bottom: 13px;
}
.date-input::-webkit-calendar-picker-indicator{
    background-color: transparent;
    cursor: pointer;
}
.search-button{
    font-size: 1em;
    padding: 5px 20px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
    margin-left: 20px;
    margin-bottom: 10px;
}
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
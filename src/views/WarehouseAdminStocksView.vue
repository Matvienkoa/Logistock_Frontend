<template>
<Header :title="'Valeur Stock'"/>
    <div class="back-head">
        <router-link to="/warehouse_admin" class="back-button">Retour</router-link>
    </div>
    <div class="page">
        <div class="page-amount-infos">Valeur Marchande Totale : <span class="total">{{value.toFixed(2)}} €</span></div>
        <Product v-for="product in getProducts" :key="product.id" :id="product.id" />
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehouseAdminStocksProduct.vue'
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'warehouse_admin_stocks',
    components: {
        Header,
        Footer,
        Product
    },
    data() {
        return {
            value: 0
        }
    },
    computed: {
      ...mapGetters(['getProducts'])
    },
    methods: {
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
            if(res.data.role !== 'warehouse') {
                this.$router.push('/store_home')
            }
            } else {
            this.$router.push('/')
            }
        })
        this.$store.dispatch('getProducts')
        instance.get('/stock/')
        .then((res) => {
            res.data.forEach(stock => {
                let value = stock.quantity * stock.buyingPrice/100
                this.value += value
            });
        })
    },
}
</script>

<style scoped>
.page{
    flex-direction: column;
}
.page-amount-infos{
    width: 80%;
    max-width: 600px;
    margin-bottom: 30px;
    text-align: end;
}
.total{
    font-weight: bold;
    color: green;
    font-size: 1.4em;
}
</style>
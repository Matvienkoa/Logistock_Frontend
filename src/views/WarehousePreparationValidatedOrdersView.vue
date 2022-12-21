<template>
<Header :title="'Commandes validées'"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation" class="back-button">retour</router-link>
    </div>
    <div class="page">
        <div v-if="orders.length <= 0" class="no-ordersValidated">
            Pas de nouvelle commande pour le moment
        </div>
        <router-link class="store-orders" v-for="order in getOrdersValidated" :key="order.id" :to="{name: 'warehouse_preparation_validated_order', params: {id: order.id}}">
            <p>Le : {{moment(order.createdAt).format('L')}}</p>
            <p>De : {{order.storeName}}</p>
        </router-link>
    </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'warehouse_preparation_validated_orders',
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            moment: moment,
            orders: []
        }
    },
    computed: {
      ...mapGetters(['getOrdersValidated'])
    },
    methods: {
    },
    created: function () {
        this.$store.dispatch('getOrdersValidated')
        .then(() => {
            this.orders = this.getOrdersValidated
        })
    },
}
</script>

<style scoped>
.no-ordersPending{
    margin-top: 30px;
}
</style>
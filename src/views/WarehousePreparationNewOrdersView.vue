<template>
<Header :title="'Commandes'"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation" class="back-button">Retour</router-link>
    </div>
    <div class="page">
        <div v-if="orders.length <= 0" class="no-ordersPending">
            Pas de nouvelle commande pour le moment
        </div>
        <router-link class="prepa-orders" v-for="order in getOrdersPending" :key="order.id" :to="{name: 'warehouse_preparation_new_order', params: {id: order.id}}">
            <div class="prepa-orders-infos">
                <p>Le : <span class="bold">{{moment(order.createdAt).format('L')}}</span></p>
                <p>N° : <span class="bold">{{order.id}}</span></p>
                <p>Mode de livraison : <span class="bold">{{order.delivery}}</span></p>
            </div>
            <p>De : {{order.storeName}}</p>
        </router-link>
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'warehouse_preparation_new_orders',
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
      ...mapGetters(['getOrdersPending'])
    },
    methods: {
    },
    created: function () {
        this.$store.dispatch('getOrdersPending')
        .then(() => {
            this.orders = this.getOrdersPending
        })
    },
}
</script>

<style>
.prepa-orders{
    position: relative;
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
.prepa-orders-infos{
    display: flex;
    flex-direction: column;
}
</style>

<style scoped>
.no-ordersPending{
    margin-top: 30px;
}
</style>
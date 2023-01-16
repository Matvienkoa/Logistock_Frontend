<template>
<Header :title="'Commandes'"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation" class="back-button">Retour</router-link>
    </div>
    <div class="page">
        <div v-if="orders.length <= 0" class="no-ordersValidated">
            Pas de nouvelle commande pour le moment
        </div>
        <router-link class="prepa-orders" v-for="order in getOrdersValidated" :key="order.id" :to="{name: 'warehouse_preparation_validated_order', params: {id: order.id}}">
            <div class="prepa-orders-infos">
                <p>Le : <span class="bold">{{moment(order.createdAt).format('L')}}</span></p>
                <p>N° : <span class="bold">{{order.id}}</span></p>
                <p>Mode de livraison : <span class="bold">{{order.delivery}}</span></p>
            </div>
            <div class="prepa-orders-infos">
                <p>De : {{order.storeName}}</p>
                <p v-if="order.billed === 'yes'" class="billed">Facturée</p>
                <p v-if="order.billed === 'no'" class="no-billed">A facturer</p>
            </div>
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
.no-billed{
    align-self: flex-end;
    color: #ea510b;
    margin-top: 5px;
    font-weight: 600;
}
.billed{
    align-self: flex-end;
    color: rgb(19, 185, 19);
    margin-top: 5px;
    font-weight: 600;
}
</style>
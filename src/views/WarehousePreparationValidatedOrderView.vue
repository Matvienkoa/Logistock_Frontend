<template>
<Header :title="'Commande Validée'"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation_validated_orders" class="back-button">Retour</router-link>
    </div>
    <div class="page">
        <div class="page-order-infos">
            <p>Commande N° : <span class="bold">{{getOrder.id}}</span></p>
            <p>Du : <span class="bold">{{moment(getOrder.createdAt).format('L')}}</span></p>
            <p>Point de vente : <span class="bold">{{getStore.name}}</span></p>
            <p>Mode de livraison : <span class="bold">{{getOrder.delivery}}</span></p>
            <p>Demandeur : <span class="bold">{{getOrder.applicant}}</span></p>
            <p v-if="getOrder.commentStore">Note à la commande : {{getOrder.commentStore}}</p>
            <p v-if="getOrder.commentWarehouse">Réponse : {{getOrder.commentWarehouse}}</p>
        </div>
        <Product v-for="detail in getOrder.orderDetails" :key="detail.id" :detail="detail.id" :id="detail.productId" :quantity="detail.quantity" />
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehousePreparationValidatedOrderProduct.vue'
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'warehouse_preparation_validated_order',
    components: {
        Header,
        Footer,
        Product,
    },
    data() {
        return {
            error: "",
            moment: moment,
        }
    },
    computed: {
      ...mapGetters(['getOrder', 'getStore', 'getProducts'])
    },
    methods: {
        
    },
    created: function () {
        this.$store.dispatch('getOrder', this.$route.params.id)
        this.$store.dispatch('getProducts')
    },
}
</script>

<style scoped>
.page{
    flex-direction: column;
}
.page-order-infos{
    width: 80%;
    max-width: 600px;
    margin-bottom: 30px;
}
</style>
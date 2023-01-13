<template>
<BillOrder v-if="this.$store.state.modeBillOrder === 'billOrder'" :order="this.getOrder" :numberOfRefs="this.numberOfRefs" />
<Header :title="'Commande Validée'"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation_validated_orders" class="back-button">Retour</router-link>
    </div>
    <div class="page">
        <div class="page-order-infos">
            <div v-if="getOrder.billed === 'yes'" class="billed-order"><img src="../assets/invoice-green.svg" class="bill">Commande Facturée</div>
            <div @click="billOrder()" v-if="getOrder.billed === 'no'" class="bill-order"><img src="../assets/invoice-white.svg" class="bill">Facturer</div>
            <p>Référence(s) présente(s) : <span class="bold">{{numberOfRefs}}</span></p>
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
import BillOrder from '@/components/WarehousePreparationValidatedOrderBill.vue'
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'warehouse_preparation_validated_order',
    components: {
        Header,
        Footer,
        Product,
        BillOrder
    },
    data() {
        return {
            error: "",
            moment: moment,
            Refs: [],
            numberOfRefs: 0
        }
    },
    computed: {
      ...mapGetters(['getOrder', 'getStore', 'getProducts'])
    },
    methods: {
        billOrder() {
            this.$store.state.modeBillOrder = "billOrder"
        }
    },
    created: function () {
        this.$store.dispatch('getOrder', this.$route.params.id)
        .then((res) => {
            res.data.orderDetails.forEach(detail => {
                this.Refs.push(detail)
                this.numberOfRefs += 1
            })
        })
        this.$store.dispatch('getProducts')
        this.$store.state.modeBillOrder = ""
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
.bill-order{
    margin: auto;
    width: 190px;
    background-image: linear-gradient(52deg, rgb(95, 148, 190),rgb(19, 108, 243));
    padding: 7px 5px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.billed-order{
    margin: auto;
    padding: 7px 5px;
    width: 190px;
    color: rgb(22, 180, 22);
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 10px;
    border: solid 3px rgb(22, 180, 22);
}
.bill{
    width: 20px;
    margin-right: 10px;
}
</style>
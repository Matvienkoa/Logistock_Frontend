<template>
    <div v-if="isLoading" id="spinner" class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
    <PurchaseOrder v-if="getModePurchase === 'ok'" :order="getOrder" :store="getStore.name" />
    <div class="error-qty-back" v-if="error">
        <div class="error-qty">
            <p>{{ error }}</p>
            <img class="close-window" @click="error = ''" src="../assets/close.svg" alt="">
        </div>
    </div>
    <ConfirmOrder v-if="this.$store.state.modeConfirmOrder === 'confirmOrder' && this.error === ''" :order="this.getOrder" />
    <AddProductToOrder v-if="getModeAddProductToOrder" />
    <Header :title="'Nouvelle Commande'"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation_new_orders" class="back-button">Retour</router-link>
        <div class="cart-button" @click="confirmOrder()">Valider la commande</div>
    </div>
    <div class="page">
        <div class="page-order-infos">
            <div @click="getToPurchase()" class="print-order"><img src="../assets/download.svg" class="download">Bon de Commande</div>
            <p>Commande N° : <span class="bold">{{getOrder.id}}</span></p>
            <p>Du : <span class="bold">{{moment(getOrder.createdAt).format('L')}}</span></p>
            <p>Point de vente : <span class="bold">{{getStore.name}}</span></p>
            <p>Mode de livraison : <span class="bold">{{getOrder.delivery}}</span></p>
            <p>Demandeur : <span class="bold">{{getOrder.applicant}}</span></p>
            <p v-if="getOrder.commentStore">Note à la commande : {{getOrder.commentStore}}</p>
        </div>
        <div @click="setupModeAddProduct()" class="print-order">Ajouter un produit</div>
        <Product v-for="detail in getOrder.orderDetails" :key="detail.id" :detail="detail.id" :id="detail.productId" :quantity="detail.quantity" :request="detail.requestQuantity" />
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehousePreparationNewOrderProduct.vue'
import ConfirmOrder from '@/components/WarehousePreparationNewOrderConfirm.vue'
import AddProductToOrder from '@/components/WarehousePreparationNewOrderAddProduct.vue'
import PurchaseOrder from '@/components/PurchaseOrder.vue'
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'warehouse_preparation_new_order',
    components: {
        Header,
        Footer,
        Product,
        ConfirmOrder,
        AddProductToOrder,
        PurchaseOrder
    },
    data() {
        return {
            error: "",
            moment: moment,
            isLoading: false,
        }
    },
    computed: {
      ...mapGetters(['getOrder', 'getStore', 'getProducts', 'getProductsInOrder', 'getModePurchase', 'getModeAddProductToOrder'])
    },
    methods: {
        setupModeAddProduct() {
            this.$store.state.modeAddProductToOrder = true
        },
        getToPurchase() {
            this.$store.commit('SET_MODE_PURCHASE', 'ok')
        },
        confirmOrder() {
            this.getProductsInOrder.forEach(product => {
                if(product.quantity > product.stock) {
                    this.error = "Impossible de valider la commande, certaines quantités demandées sont supérieures aux stocks disponibles, veuillez ajuster les quantités correspondantes"
                }
            })
            if(this.error === '') {
                this.$store.state.modeConfirmOrder = "confirmOrder"
            }
        }
    },
    created: function () {
        this.isLoading = true;
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
        this.$store.commit('RESET_MODE_PURCHASE')
        this.$store.state.modeAddProductToOrder = false;
        this.$store.dispatch('getOrder', this.$route.params.id)
        this.$store.dispatch('getProducts')
        this.$store.dispatch('checkStocks', this.$route.params.id)
        .then(() => {
            this.isLoading = false;
        })
        this.$store.state.modeConfirmOrder = ''
        this.$store.state.modeEditProductQuantity = ''
    },
}
</script>

<style scoped>
.page{
    flex-direction: column;
}
.print-order{
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
.download{
    width: 20px;
    margin-right: 10px;
}
.page-order-infos{
    width: 80%;
    max-width: 600px;
    margin-bottom: 30px;
}
.error-qty-back{
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.error-qty{
    position: relative;
    width: 80%;
    height: 30%;
    max-width: 400px;
    max-height: 250px;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
.error-qty p{
    width: 90%;
    text-align: center;
    color: #ea510b;
}
.close-window{
    position: absolute;
    top: 8px;
    right: 15px;
    width: 20px;
    cursor: pointer;
}
</style>
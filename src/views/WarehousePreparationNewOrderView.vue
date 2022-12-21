<template>
<ConfirmOrder v-if="this.$store.state.modeConfirmOrder === 'confirmOrder'" :order="this.getOrder" />
<Header :title="getOrder.id"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation_new_orders" class="back-button">retour</router-link>
        <div class="cart-button" @click="confirmOrder()">Valider la commande</div>
    </div>
    <div class="page">
        <div class="error" v-if="error">{{ error }}</div>
        <Product v-for="detail in getOrder.orderDetails" :key="detail.id" :detail="detail.id" :id="detail.productId" :quantity="detail.quantity" />
    </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehousePreparationNewOrderProduct.vue'
import ConfirmOrder from '@/components/WarehousePreparationNewOrderConfirm.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_preparation_new_order',
    components: {
        Header,
        Footer,
        Product,
        ConfirmOrder
    },
    data() {
        return {
            error: ""
        }
    },
    computed: {
      ...mapGetters(['getOrder', 'getStore', 'getProducts', 'getProductsInOrder'])
    },
    methods: {
        confirmOrder() {
            this.getProductsInOrder.forEach(product => {
                if(product.quantity > product.stock) {
                    this.error = "pas possible"
                } else {
                    this.$store.state.modeConfirmOrder = "confirmOrder"
                }
            })
        }
    },
    created: function () {
        this.$store.dispatch('getOrder', this.$route.params.id)
        this.$store.dispatch('getProducts')
        this.$store.dispatch('checkStocks', this.$route.params.id)
    },
}
</script>

<style scoped>

</style>
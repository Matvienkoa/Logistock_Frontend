<template>
<Header :title="getOrder.id"/>
    <router-link to="/warehouse_preparation_validated_orders">
        retour
    </router-link>
    <div class="page">
        <Product v-for="detail in getOrder.orderDetails" :key="detail.id" :detail="detail.id" :id="detail.productId" :quantity="detail.quantity" />
    </div>
    
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehousePreparationValidatedOrderProduct.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_preparation_validated_order',
    components: {
        Header,
        Footer,
        Product,
    },
    data() {
        return {
            error: ""
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
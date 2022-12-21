<template>
<Header :title="'Valeur stock'"/>
    <div class="back-head">
        <router-link to="/warehouse_admin" class="back-button">retour</router-link>
    </div>
    <div class="page">
        <Product v-for="product in getProducts" :key="product.id" :id="product.id" />
    </div>
    
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehouseAdminStocksProduct.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_admin_stocks',
    components: {
        Header,
        Footer,
        Product
    },
    computed: {
      ...mapGetters(['getProducts'])
    },
    methods: {
    },
    created: function () {
        this.$store.dispatch('getProducts')
    },
}
</script>
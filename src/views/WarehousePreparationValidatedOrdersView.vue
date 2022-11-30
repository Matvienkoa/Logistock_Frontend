<template>
<Header :title="'Commandes validées'"/>
    <router-link to="/warehouse_preparation">
        retour
    </router-link>
    <div class="page">
        <div v-for="order in getOrdersValidated" :key="order.id">
            <router-link v-if="order && order.id" :to="{name: 'warehouse_preparation_validated_order', params: {id: order.id}}">
                {{order.createdAt}}
                {{order.status}}
                {{order.storeName}}
            </router-link>
            
        </div>
    </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_preparation_validated_orders',
    components: {
        Header,
        Footer,
    },
    computed: {
      ...mapGetters(['getOrdersValidated'])
    },
    methods: {
    },
    created: function () {
        this.$store.dispatch('getOrdersValidated')
    },
}
</script>
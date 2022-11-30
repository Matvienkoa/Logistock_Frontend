<template>
<Header :title="'Points de ventes'"/>
    <router-link to="/warehouse_admin">
        retour
    </router-link>
    <div class="page">
        <div v-for="store in getStores" :key="store.id">
        <router-link v-if="store && store.id" :to="{name: 'warehouse_admin_store', params: {id: store.id}}" class="">{{ store.name }}</router-link>
        </div>
    </div>
    
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_admin_stores',
    components: {
        Header,
        Footer,
    },
    computed: {
      ...mapGetters(['getStores'])
    },
    methods: {
    },
    created: function () {
        this.$store.dispatch('getStores')
    },
}
</script>
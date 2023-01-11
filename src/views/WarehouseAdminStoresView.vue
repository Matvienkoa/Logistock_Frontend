<template>
<Header :title="'Points de ventes'"/>
    <div class="back-head">
        <router-link to="/warehouse_admin" class="back-button">Retour</router-link>
    </div>
    <div class="page">
        <router-link v-for="store in getStores" :key="store.id" :to="{name: 'warehouse_admin_store', params: {id: store.id}}" class="menu-links-list">
            <div class="menu-bloc-list">
                <div class="title-list">{{ store.name }}</div> 
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

<style scoped>
.menu-links-list{
  max-width: 600px;
}
</style>
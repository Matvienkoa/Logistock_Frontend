<template>
<Header :title="'Valeur stock'"/>
    <router-link to="/warehouse_admin">
        retour
    </router-link>
    <div class="page">
        
    </div>
    
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'


export default {
    name: 'warehouse_admin_stocks',
    components: {
        Header,
        Footer,
    },
    computed: {
      
    },
    methods: {
    },
    created: function () {
        
    },
}
</script>
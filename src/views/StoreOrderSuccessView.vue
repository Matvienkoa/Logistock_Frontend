<template>
<Header :title="'Welcome'"/>
    <div>Votre commande a bien été envoyée! Vous serez rapidement informés de sa validation</div>
    <div>Vous pouvez la retrouver dans</div>
    <router-link to="/store_orders">vos commandes</router-link>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'

export default {
    name: 'Store-order-success',
    components: {
        Header,
        Footer,
    },
}
</script>
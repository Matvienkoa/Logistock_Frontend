<template>
<Header :title="'Welcome'"/>
<div class="page-success">
    <div class="title-success">Commande transmise!</div>
    <div class="txt-success">Vous serez rapidement informés de sa validation</div>
    <div class="txt-success">Vous pouvez la retrouver dans :</div>
    <router-link class="orders-button" to="/store_orders">Vos commandes</router-link>
</div>
    
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

<style scoped>
.page-success{
    width: 90%;
    max-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    text-align: center;
    font-size: 1.2em;
}
.title-success{
    font-size: 1.4em;
    margin-bottom: 20px;
}
.txt-success{
    margin-bottom: 10px;
}
.orders-button{
    text-decoration: none;
    padding: 5px 20px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
    margin-top: 30px;
}
</style>
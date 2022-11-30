<template>
    <div id="confirm-cart-back">
        <div id="confirm-cart">
            valider la commande?
            <button @click="confirmOrder()">Valider</button>
            <button @click="backToCart()">Retour au panier</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'Store-confirm-cart',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters(['getProfile', 'getStore'])
    },
    methods: {
        confirmOrder() {
            let cart = localStorage.getItem('cart')
            cart = JSON.parse(cart)
            console.log(cart)
            instance.post(`/order/`, {
                delivery: 'livraison',
                status: 'pending',
                storeId: this.getStore.id
            })
            .then((res) => {
                if(res.status === 201) {
                    cart.forEach(product => {
                        instance.post(`/orderdetails/`, {
                            productId: product.id,
                            orderId: res.data.id,
                            quantity: product.quantity
                        })
                        .then((res) => {
                            if(res.status === 201) {
                                localStorage.removeItem('cart')
                                this.$router.push('/store_order_success')
                            }
                        })
                    })
                }
            })
        },
        backToCart() {
            this.$store.state.modeConfirmCart = ""
        }
    },
    created() {
        this.$store.dispatch('getProfile')
    }
}
</script>

<style scoped>
#confirm-cart-back{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.836);
    display: flex;
    justify-content: center;
    align-items: center;
}
#confirm-cart{
    width: 70%;
    height: 60%;
    background-color: rgb(179, 179, 179);
}
</style>
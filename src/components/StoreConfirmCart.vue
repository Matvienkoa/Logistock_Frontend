<template>
    <div class="confirm-cart-back">
        <div class="confirm-cart">
            <div class="confirm-cart-box">
                <p class="confirm-cart-title">Valider la commande?</p>
                <div class="confirm-cart-buttons">
                    <button class="confirm-cart-button" @click="confirmOrder()">Valider</button>
                    <button class="cancel-cart-button" @click="backToCart()">Retour au panier</button>
                </div>
            </div>
            
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
.confirm-cart-back{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.confirm-cart{
    position: relative;
    width: 80%;
    height: 30%;
    max-width: 400px;
    max-height: 250px;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
.confirm-cart-box{
    text-align: center;
}
.confirm-cart-title{
    margin-bottom: 20px;
    font-size: 2em;
}
.confirm-cart-button{
    margin-right: 10px;
    border: none;
    width: 100px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
    height: 30px;
    border-radius: 10px;
}
.cancel-cart-button{
    margin-left: 10px;
    border: none;
    width: 130px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
    height: 30px;
    border-radius: 10px;
}
</style>
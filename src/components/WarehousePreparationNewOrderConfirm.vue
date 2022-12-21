<template>
    <div class="confirm-order-back">
        <div class="confirm-order">
            <div class="confirm-order-box">
                <p class="confirm-order-title">Valider la commande?</p>
                <div class="confirm-order-buttons">
                    <button class="confirm-order-button" @click="confirmOrder()">Valider</button>
                    <button class="cancel-order-button" @click="backToOrder()">Retour</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'warehouse_preparation_new_order_confirm',
    props: ["order"],
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['getProfile', 'getStore'])
    },
    methods: {
        confirmOrder() {
            this.order.orderDetails.forEach(detail => {
                instance.post(`/stock/update/${detail.productId}`, {
                    quantity: detail.quantity
                })
                .then((res) => {
                    console.log(res)
                    
                })
                .catch((error) => {
                    console.log(error.response.data.message)
                })
            })
            instance.put(`/order/confirm/${this.$route.params.id}`)
            .then((res) => {
                if(res.status === 201) {
                    res.data.orderDetails.forEach(detail => {
                        instance.post(`/sale/`, {
                            productId: detail.productId,
                            storeId: this.order.storeId,
                            quantity: detail.quantity
                        })
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((error) => {
                            console.log(error.response.data.message)
                        })
                    })
                    this.$router.push('/warehouse_preparation_new_orders')
                }
            })
        },
        backToOrder() {
            this.$store.state.modeConfirmOrder = ""
        }
    },
    created() {
        this.$store.dispatch('getProfile')
    }
}
</script>

<style scoped>
.confirm-order-back{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.confirm-order{
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
.confirm-order-box{
    text-align: center;
}
.confirm-order-title{
    margin-bottom: 20px;
    font-size: 2em;
}
.confirm-order-button{
    margin-right: 10px;
    border: none;
    width: 100px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
    height: 30px;
    border-radius: 10px;
}
.cancel-order-button{
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
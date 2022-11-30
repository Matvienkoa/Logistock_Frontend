<template>
    <div id="confirm-order-back">
        <div id="confirm-order">
            valider la commande?
            <button @click="confirmOrder()">Valider</button>
            <button @click="backToOrder()">Retour</button>
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
                console.log(res)
                if(res.status === 201) {
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
#confirm-order-back{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.836);
    display: flex;
    justify-content: center;
    align-items: center;
}
#confirm-order{
    width: 70%;
    height: 60%;
    background-color: rgb(179, 179, 179);
}
</style>
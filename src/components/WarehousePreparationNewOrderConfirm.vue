<template>
    <div class="confirm-order-back">
        <div class="confirm-order">
            <div class="confirm-order-box">
                <p class="confirm-order-title">Valider la commande?</p>
                <div class="comment-box">
                    <p>Ajouter un commentaire :</p>
                    <textarea v-model="commentWarehouse" cols="30" rows="10"></textarea>
                </div>
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
            commentWarehouse: "",
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
            })
            instance.put(`/order/confirm/${this.$route.params.id}`, {
                commentWarehouse: this.commentWarehouse
            })
            .then((res) => {
                if(res.status === 201) {
                    res.data.orderDetails.forEach(detail => {
                        if(detail.quantity > 0) {
                            instance.post(`/sale/`, {
                                productId: detail.productId,
                                storeId: this.order.storeId,
                                quantity: detail.quantity
                            })
                        }
                    })
                    this.$store.state.modeConfirmOrder = ""
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
    height: 50%;
    max-width: 450px;
    max-height: 350px;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
.confirm-order-box{
    width: 100%;
    text-align: center;
}
.confirm-order-title{
    margin: auto;
    margin-bottom: 10px;
    font-size: 1.8em;
    width: 95%;
}
.comment-box textarea{
    height: 80px;
    width: 80%;
    max-width: 300px;
    resize: none;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding: 5px 8px;
}
.comment-box textarea:focus{
    outline: none;
}
.confirm-cart-buttons{
    margin-top: 10px;
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
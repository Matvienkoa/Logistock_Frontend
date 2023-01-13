<template>
    <div class="confirm-bill-back">
        <div class="confirm-bill">
            <div class="confirm-bill-box">
                <p class="confirm-bill-title">Facturer la commande?</p>
                <p class="confirm-bill-number">({{this.numberOfRefs}} références présentes)</p>
                <div class="confirm-bill-buttons">
                    <button class="confirm-bill-button" @click="confirmBill()">Valider</button>
                    <button class="cancel-bill-button" @click="backToOrder()">Retour</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'Warehouse-preparation-validated-order-bill',
    props: ["order", "numberOfRefs"],
    computed: {
        ...mapGetters(['getOrder'])
    },
    methods: {
        confirmBill() {
            instance.put(`/order/invoice/${this.$route.params.id}`)
            .then((res) => {
                console.log(res.data)
                if(res.status === 201) {
                    this.$store.state.modeBillOrder = ""
                    this.$router.push('/warehouse_preparation_validated_orders')
                }
            })
        },
        backToOrder() {
            this.$store.state.modeBillOrder = ""
        }
    },
    created() {
        this.$store.dispatch('getProfile')
    }
}
</script>

<style scoped>
.confirm-bill-back{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.confirm-bill{
    position: relative;
    width: 80%;
    height: 30%;
    max-width: 450px;
    max-height: 350px;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
.confirm-bill-box{
    width: 100%;
    text-align: center;
}
.confirm-bill-title{
    margin: auto;
    margin-bottom: 15px;
    font-size: 1.6em;
    width: 95%;
}
.confirm-bill-number{
    margin-bottom: 20px;
    font-size: 1.2em;
}
.confirm-bill-buttons{
    margin-top: 10px;
}
.confirm-bill-button{
    margin-right: 10px;
    border: none;
    width: 100px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
    height: 30px;
    border-radius: 10px;
}
.cancel-bill-button{
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
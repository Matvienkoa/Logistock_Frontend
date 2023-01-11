<template>
    <div class="new-order-edit-quantity">
        <div class="new-order-edit-quantity-inputs">
            <label>Nouvelle quantité : </label>
            <input class="new-order-edit-quantity-input" v-model="quantity" type="number">
        </div>
        <div class="error" v-if="error">{{ error }}</div>
        <div class="new-order-edit-quantity-buttons">
            <button class="new-order-edit-quantity-add-button" @click="editOrderDetails()">Modifier</button>
            <p class="new-order-edit-quantity-cancel-button" @click="setModeNoEdit()">Annuler</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'Warehouse-preparation-new-order-edit-quantity',
    props: ["id", "stock"],
    data() {
        return {
            error: "",
            quantity: 0
        }
    },
    methods: {
        setModeNoEdit() {
            this.$store.state.modeEditProductQuantity = ''
        },
        editOrderDetails() {
            if(this.quantity === null || this.quantity < 0 || this.quantity === "") {
                this.error = "Merci d'ajouter une quantité valable"
            } else {
                if(this.quantity <= this.stock) {
                    instance.put(`/orderdetails/${this.id}`, {
                        quantity: this.quantity
                    })
                    .then((res) => {
                        if(res.status === 201) {
                            this.$store.state.modeEditProductQuantity = ''
                            this.$store.dispatch('getOrder', this.$route.params.id)
                            this.$store.dispatch('checkStocks', this.$route.params.id)
                        }
                    })
                } else {
                    this.error = "Pas assez de stock sur l'entrepôt, veuillez réduire la quantité"
                }
            }
            
        }
    },
    computed: {
        ...mapGetters(['getProduct'])
    },
    created() {
        this.$store.dispatch('getProfile')
        instance.get(`/orderdetails/${this.id}`)
        .then((res) => {
            this.quantity = res.data.quantity
        })
    }
}
</script>

<style scoped>
.new-order-edit-quantity{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}
.new-order-edit-quantity-inputs{
    margin-bottom: 5px;
}
.new-order-edit-quantity-input{
    width: 60px;
}
.error{
    margin-top: 5px;
    margin-bottom: 10px;
}
.new-order-edit-quantity-buttons{
    display: flex;
    justify-content: center;
    align-items: center;
}
.new-order-edit-quantity-add-button{
    border: none;
    width: 80px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
    height: 25px;
    border-radius: 10px;
    margin-right: 5px;
}
.new-order-edit-quantity-cancel-button{
    font-weight: 600;
    margin-left: 5px;
    cursor: pointer;
}
</style>
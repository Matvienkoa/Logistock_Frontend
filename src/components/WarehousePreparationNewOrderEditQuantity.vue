<template>
    <div>modifier la quantité</div>
    <input v-model="quantity" type="number" name="" id="">
    <div v-if="error">{{ error }}</div>
    <button @click="editOrderDetails()">Modifier</button>
    <button @click="setModeNoEdit()">Annuler</button>
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
            if(this.quantity === null || this.quantity === 0) {
                this.error = "merci d'ajouter une quantité valable"
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
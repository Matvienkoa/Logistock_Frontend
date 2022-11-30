<template>
    <div>{{this.id}} {{this.product.name}} {{this.stock}} {{this.quantity}} <button @click="setModeEdit(this.detail)">modifier la quantité</button></div>
    <EditQuantity v-if="this.$store.state.modeEditProductQuantity === 'edit' && this.$store.state.detailId === this.detail" :id="this.detail" :stock="this.stock"/>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';
import EditQuantity from '@/components/WarehousePreparationNewOrderEditQuantity.vue'

export default {
    name: 'Warehouse-preparation-new-order-product',
    props: ["id", "quantity", "detail"],
    components: {
      EditQuantity,
    },
    data() {
        return {
            error: "",
            stock: 0,
            product: "",
        }
    },
    computed: {
        ...mapGetters(['getProduct'])
    },
    methods: {
        setModeEdit(detail) {
            this.$store.state.detailId = detail
            this.$store.state.modeEditProductQuantity = 'edit'
        }
    },
    created() {
        this.$store.dispatch('getProfile')
        instance.get(`/product/${this.id}`)
        .then((res) => {
            this.product = res.data
            res.data.stocks.forEach(stock => {
                this.stock += stock.quantity
            })
        })
    }
}
</script>
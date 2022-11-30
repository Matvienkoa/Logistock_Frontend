<template>
    <div>{{this.id}} {{this.product.name}} {{this.quantity}}</div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'Warehouse-preparation-validated-order-product',
    props: ["id", "quantity", "detail"],
    components: {
      
    },
    data() {
        return {
            error: "",
            product: "",
        }
    },
    computed: {
        ...mapGetters(['getProfile'])
    },
    methods: {
        
    },
    created() {
        this.$store.dispatch('getProfile')
        instance.get(`/product/${this.id}`)
        .then((res) => {
            this.product = res.data
        })
    }
}
</script>
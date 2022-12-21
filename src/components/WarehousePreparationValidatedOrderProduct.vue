<template>
    <div class="prepa-product-order">
        <div class="product-order-infos">
            <div class="product-order-name">
                <p>{{this.product.name}}</p>
                <p>Référence : {{this.product.reference}}</p>
                <p>Format : {{this.product.size}}</p>
            </div>
            <div class="product-order-stock">
                <div class="qty-txt">Qté. Livrée : <div class="qty">{{this.quantity}}</div></div>
            </div>
        </div>
    </div>
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

<style scoped>
.product-order-infos{
    align-items: center;
}
</style>
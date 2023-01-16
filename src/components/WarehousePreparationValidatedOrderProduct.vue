<template>
    <div class="prepa-product-order">
        <div class="product-order-infos">
            <div v-if="product !== null" class="product-order-name">
                <p class="bold">{{this.product.name}}</p>
                <p>Référence : {{this.product.reference}}</p>
                <p>Format : {{this.product.size}}</p>
            </div>
            <div v-if="product === null" class="product-order-name">
                <p>Ce produit n'existe plus</p>
            </div>
            <div class="product-order-stock">
                <div class="qty-txt">Qté. Livrée : <div class="qty">{{this.quantity}}</div></div>
                <div class="req-txt"><span class="req">{{this.request}}</span>commandé(s)</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'Warehouse-preparation-validated-order-product',
    props: ["id", "quantity", "detail", "request"],
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
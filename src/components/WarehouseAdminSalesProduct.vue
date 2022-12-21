<template>
    <div class="link-products">
        <div class="title-box-products">
            <div class="img-box-products">
            <img :src="product.image" alt="" class="img-products">
            </div>
            <div>{{ product.name }}</div>
        </div>
        <div class="infos-box-products">
            <div class="infos-products">
            <div>Réf : {{ product.reference }}</div>
            <div>Format : {{ product.size }}</div>
            </div>
            <div class="stocks-products">
            <div>Ventes : {{ quantity }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_admin_sales_product',
    props: ["id", "store", "supplier", "start", "end"],
    data() {
        return {
            product: "",
            quantity: 0,
        }
    },
    computed: {
        ...mapGetters(['getProduct']),
    },
    created() {
        this.$store.dispatch(`getProduct`, this.id)
        .then((res) => {
            this.product = res.data
            instance.post(`/sale/product/quantity/${this.id}`, {
                store: this.store,
                supplier: this.supplier,
                start: this.start,
                end: this.end,
            })
            .then((res) => {
                console.log(res)
                this.quantity = res.data
            })
        })
    }
}
</script>

<style scoped>
.link-products{
    width: 100%;
}
</style>
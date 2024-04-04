<template>
    <div class="prepa-product-order">
        <div v-if="isLoading" id="spinner" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
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
            isLoading: false,
        }
    },
    computed: {
        ...mapGetters(['getProfile'])
    },
    created() {
        this.isLoading = true;
        this.$store.dispatch('getProfile')
        instance.get(`/product/${this.id}`)
        .then((res) => {
            this.product = res.data
            this.isLoading = false;
        })
    }
}
</script>

<style scoped>
.lds-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background: rgba(168, 168, 168, 0.37);
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 5px;
  border: 4px solid #c90200;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #c90200 transparent transparent transparent;
  z-index: 2;
}
.product-order-infos{
    align-items: center;
}
@media (max-width: 600px) {
    .product-order-infos{
        flex-direction: column;
        align-items: flex-start;
    }
    .product-order-stock{
        align-self: flex-end;
    }
}
</style>
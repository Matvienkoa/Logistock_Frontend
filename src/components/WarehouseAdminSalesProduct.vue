<template>
    <div class="admin-product-sale">
        <div v-if="isLoading" id="spinner" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="product-sale-infos">
            <div class="product-sale-name">
                <p class="bold">{{ product.name }}</p>
                <p>Référence : {{ product.reference }}</p>
                <p>Format : {{ product.size }}</p>
            </div>
            <div class="product-sale-sales">
                <div class="sale-txt">Volume : <div class="sale">{{quantity}}</div></div>
                <div v-if="value !== 'Pas de prix de vente'" class="val-txt">Valeur : <div class="val">{{value}} €</div></div>
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
            value: "",
            isLoading: false,
        }
    },
    computed: {
        ...mapGetters(['getProduct']),
    },
    created() {
        this.isLoading = true;
        this.$store.dispatch(`getProduct`, this.id)
        .then((res) => {
            const prod = res.data
            this.product = prod
            instance.post(`/sale/product/quantity/${this.id}`, {
                store: this.store,
                supplier: this.supplier,
                start: this.start,
                end: this.end,
            })
            .then((res) => {
                this.quantity = res.data
                if(prod.sellingPrice === null) {
                    this.value = 'Pas de prix de vente'
                } else {
                    this.value = (res.data*prod.sellingPrice/100).toFixed(2)
                }
                this.isLoading = false;
            })
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
  background: rgba(114, 114, 114, 0.37);
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
.admin-product-sale{
    position: relative;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 5px;
    padding: 10px 0;
}
.product-sale-infos{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.product-sale-name{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
}
.product-sale-sales{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 10px;
    margin-left: 10px;
}
.sale-txt, .val-txt{
  display: flex;
  align-items: center;
}
.sale, .val{
    color: green;
    font-size: 1.4em;
    font-weight: 600;
    margin-left: 5px;
}
</style>

<style scoped>
@media (max-width: 600px) {
    .product-sale-sales{
        align-items: flex-start;
    }
    .product-sale-infos{
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
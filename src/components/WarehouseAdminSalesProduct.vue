<template>
    <div class="admin-product-sale">
        <div class="product-sale-infos">
            <div class="product-sale-name">
                <p class="bold">{{ product.name }}</p>
                <p>Référence : {{ product.reference }}</p>
                <p>Format : {{ product.size }}</p>
            </div>
            <div class="product-sale-sales">
                <div class="sale-txt">Ventes : <div class="sale">{{quantity}}</div></div>
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
            quantity: 0
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
                this.quantity = res.data
            })
        })
    }
}
</script>

<style scoped>
.admin-product-sale{
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
}
.product-sale-name{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
}
.product-sale-sales{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: green;
    margin-right: 10px;
}
.sale-txt{
  display: flex;
  align-items: center;
}
.sale{
  font-size: 2em;
  font-weight: 600;
  margin-left: 5px;
}
</style>
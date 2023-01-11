<template>
  <div class="admin-product-value">
    <div class="product-value-infos">
      <div class="product-value-name">
        <p class="bold">{{ product.name }}</p>
        <p>Référence : {{product.reference}}</p>
        <p>Format : {{product.size}}</p>
      </div>
      <div class="product-value-stock">
        <div class="value-txt">Valeur Marchande : </div>
        <div class="value">{{amount/100}} €</div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_admin_stocks_product',
    props: ["id"],
    data() {
        return {
            product: "",
            amount: 0,
        }
    },
    computed: {
        ...mapGetters(['getProduct']),
    },
    created() {
        this.$store.dispatch(`getProduct`, this.id)
        .then((res) => {
            this.product = res.data
            instance.get(`/stock/marketvalue/${this.id}`)
            .then((res) => {
                this.amount = res.data
            })
        })
    }
}
</script>

<style scoped>
.admin-product-value{
    width: 80%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 5px;
    padding: 10px;
}
.product-value-infos{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.product-value-name{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.product-value-stock{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: green;
}
.value-txt{
  display: flex;
  align-items: center;
}
.value{
  font-size: 1.5em;
  font-weight: 600;
  margin-left: 5px;
}
</style>
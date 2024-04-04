<template>
  <div class="admin-product-value">
    <div v-if="isLoading" id="spinner" class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="product-value-infos">
      <div class="product-value-name">
        <p class="bold">{{ product.name }}</p>
        <p>Référence : {{product.reference}}</p>
        <p>Format : {{product.size}}</p>
      </div>
      <div class="product-value-stock">
        <div class="value-txt">Valeur Marchande : <div class="value">{{(amount/100).toFixed(2)}} €</div></div>
        <div class="value-txt">Stock : <div class="value">{{qty}}</div></div>
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
            qty: 0,
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
            this.product = res.data
            instance.get(`/stock/marketvalue/${this.id}`)
            .then((res) => {
                this.amount = res.data.amount
                this.qty = res.data.qty
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
.admin-product-value{
    position: relative;
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
    flex-wrap: wrap;
}
.product-value-name{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
}
.product-value-stock{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.value-txt{
  display: flex;
  align-items: center;
}
.value{
  font-size: 1.2em;
  font-weight: 600;
  margin-left: 5px;
  color: green;
}
@media (min-width: 700px) {
  .product-value-stock{
    align-items: flex-end;
  }
}
</style>

<style scoped>
@media (max-width: 600px) {
    .product-value-stock{
        align-items: flex-start;
    }
    .product-value-infos{
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
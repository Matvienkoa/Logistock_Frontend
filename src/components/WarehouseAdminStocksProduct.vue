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
          <div>Valeur Marchande : {{amount/100}}</div>
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
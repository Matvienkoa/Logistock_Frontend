<template>
<Header :title="'Inventaire produit'"/>
  <div class="about">

    <div class="form-product">
      <label class="label">Quantité</label>
      <input class="input" @input="cancelError()" v-model="quantity" type="number" />
      <label class="label">Date d'achat</label>
      <input class="input" @input="cancelError()" v-model="buyingDate" type="date" />
      <label class="label">Prix d'achat</label>
      <input class="input" @input="cancelError()" v-model="buyingPrice" type="number" />
      <label class="label">DLUO</label>
      <input class="input" @input="cancelError()" v-model="dluo" type="date" />
      <div id="error" v-if="error">{{ error.message }}</div>
      <button @click="editStock()" id="add-button" type="button">Ajouter</button>
    </div>

    <router-link v-if="getStock && getStock.productId" :to="{name: 'warehouse_inventory_product', params: {id: getStock.productId}}">
        retour
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_inventory_edit_stock_product',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          quantity: "",
          buyingDate: "",
          buyingPrice: "",
          dluo: "",
          error: ""
      }
  },
  computed: {
        ...mapGetters(['getStock'])
  },
  methods: {
    cancelError() {
      const emptyInput = document.querySelectorAll('.input');
      emptyInput.forEach(input => {
          if(input.value !== "") {
              input.classList.remove('empty')
          }
      })
      this.error = ''
    },
    editStock() {
      instance.put(`/stock/${this.$route.params.id}`, {
        quantity: this.quantity,
        buyingDate: this.buyingDate,
        buyingPrice: this.buyingPrice*100,
        dluo: this.dluo,
        productId: this.getStock.productId
      })
      .then((res) => {
          if(res.status === 201) {
              this.$router.push(`/warehouse_inventory_product/${this.getStock.productId}`)
          }
      })
      .catch((error) => {
        this.error = error.response.data;
        const emptyInput = document.querySelectorAll('.input');
        emptyInput.forEach(input => {
            if(input.value === "") {
                input.classList.add('empty')
            }
        })
      })
    }
  },
    created() {
        this.$store.dispatch('getStock', this.$route.params.id)
        .then((response) => {
            this.quantity = response.data.quantity
            this.buyingDate = response.data.buyingDate
            this.buyingPrice = response.data.buyingPrice
            this.dluo = response.data.dluo
        })
    },
}
</script>

<style scoped>
/* Errors input */
  .empty{
    border: solid 2px #fa4c67;
  }
  #error{
    color: #fa4c67;
  }
</style>
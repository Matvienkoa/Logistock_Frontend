<template>
<Header :title="'Inventaire produit'"/>
  <div class="back-head">
    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_inventory_product', params: {id: getProduct.id}}" class="back-button">
        retour
    </router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <label class="label">Quantité</label>
      <input class="input" @input="cancelError()" v-model="quantity" type="number" />
      <label class="label">Date d'achat</label>
      <input class="input" @input="cancelError()" v-model="buyingDate" type="date" />
      <label class="label">Prix d'achat</label>
      <input class="input" @input="cancelError()" v-model="buyingPrice" type="number" />
      <label class="label">DLUO</label>
      <input class="input" @input="cancelError()" v-model="dluo" type="date" />
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="addStock()" class="valid-add-button">Ajouter</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_inventory_add_stock_product',
  components: {
    Header,
    Footer,
  },
  props: ['id'],
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
        ...mapGetters(['getProduct'])
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
    addStock() {
      if(this.quantity === null || this.quantity <= 0) {
          this.error = { message: "Merci d'ajouter une quantité valide"}
      } else {
        instance.post(`/stock/`, {
          quantity: this.quantity,
          buyingDate: this.buyingDate,
          buyingPrice: this.buyingPrice*100,
          dluo: this.dluo,
          productId: this.getProduct.id
        })
        .then((res) => {
            if(res.status === 201) {
                this.$router.push(`/warehouse_inventory_product/${this.$route.params.id}`)
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
    }
  },
  created: function () {
      this.$store.dispatch('getProduct', this.$route.params.id)
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
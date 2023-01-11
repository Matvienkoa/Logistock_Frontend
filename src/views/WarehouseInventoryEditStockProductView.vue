<template>
<Header :title="'Modifier le Stock'"/>
  <div class="back-head">
    <router-link v-if="getStock && getStock.productId" :to="{name: 'warehouse_inventory_product', params: {id: getStock.productId}}" class="back-button">
        Retour
    </router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <label class="label">Quantité<span class="star">*</span></label>
      <input id="input-qty" class="input" @input="cancelError()" v-model="quantity" type="number" placeholder="Nombre de colis" />
      <label class="label">Date d'achat<span class="star">*</span></label>
      <input class="input" @input="cancelError()" v-model="buyingDate" type="date" />
      <label class="label">Prix d'achat<span class="star">*</span></label>
      <input id="input-price" class="input" @input="cancelError()" v-model="buyingPrice" type="number" placeholder="En €" />
      <label class="label">DLUO<span class="star">*</span></label>
      <input class="input" @input="cancelError()" v-model="dluo" type="date" />
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="editStock()" class="valid-add-button">Modifier</button>
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
      if(this.quantity === null || this.quantity <= 0 || this.buyingPrice === null || this.buyingPrice <= 0) {
        if(this.quantity === null || this.quantity <= 0) {
          this.error = { message: "Merci d'ajouter une quantité valide (> à 0)"}
          const nameInput = document.getElementById('input-qty');
          nameInput.classList.add('empty')
        }
        if(this.buyingPrice === null || this.buyingPrice <= 0) {
          this.error = { message: "Merci d'ajouter un prix d'achat valide (> à 0)"}
          const priceInput = document.getElementById('input-price');
          priceInput.classList.add('empty')
        }
        if((this.buyingPrice === null || this.buyingPrice <= 0) && (this.quantity === null || this.quantity <= 0)) {
          this.error = { message: "Merci d'ajouter une quantité et un prix d'achat valides (> à 0)"}
          const nameInput = document.getElementById('input-qty');
          nameInput.classList.add('empty')
          const priceInput = document.getElementById('input-price');
          priceInput.classList.add('empty')
        }
      } else {
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
.error{
  margin-bottom: 20px;
}
</style>
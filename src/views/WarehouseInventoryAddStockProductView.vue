<template>
<Header :title="'Création Stock'"/>
  <div class="back-head">
    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_inventory_product', params: {id: getProduct.id}}" class="back-button">
        Retour
    </router-link>
  </div>
  <div class="page-form">
    <h1 class='title-edit'>{{getProduct.name}}</h1>
    <div class="form">
      <p class="label-form">Quantité<span class="star">*</span><span class="number-infos">(Supérieure à 0)</span></p>
      <input id="input-qty" class="input" @input="cancelError()" v-model="quantity" type="number" min="1" placeholder="Nombre de colis" />
      <p class="label-form">Date d'achat<span class="star">*</span></p>
      <input id="input-date" class="input" @input="cancelError()" v-model="buyingDate" type="date" />
      <p class="label-form">Prix d'achat<span class="star">*</span><span class="number-infos">(Renseigner 0 si pas d'infos)</span></p>
      <input id="input-price" class="input" @input="cancelError()" v-model="buyingPrice" type="number" min="0" placeholder="En €" />
      <p class="label-form">DLUO<span class="star">*</span><span class="number-infos">(Renseigner 'aujourd'hui' si pas de DLUO)</span></p>
      <input id="input-dluo" class="input" @input="cancelError()" v-model="dluo" type="date" />
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="addStock()" class="valid-add-button">Créer le stock</button>
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
      if(this.quantity === null || this.quantity <= 0 || this.buyingPrice === null || this.buyingPrice < 0) {
        if(this.quantity === null || this.quantity <= 0) {
          this.error = { message: "Merci d'ajouter une quantité valide (> à 0)"}
          const nameInput = document.getElementById('input-qty');
          nameInput.classList.add('empty')
        }
        if(this.buyingPrice === null || this.buyingPrice < 0) {
          this.error = { message: "Merci d'ajouter un prix d'achat valide (> à -1)"}
          const priceInput = document.getElementById('input-price');
          priceInput.classList.add('empty')
        }
        if((this.buyingPrice === null || this.buyingPrice < 0) && (this.quantity === null || this.quantity <= 0)) {
          this.error = { message: "Merci d'ajouter une quantité et un prix d'achat valides (> à 0)"}
          const nameInput = document.getElementById('input-qty');
          nameInput.classList.add('empty')
          const priceInput = document.getElementById('input-price');
          priceInput.classList.add('empty')
        }
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
      this.$store.dispatch('checkToken')
      .then((res) => {
        if(res === 'expired') {
          this.$router.push('/')
        }
      })
      this.$store.dispatch('getProfile')
      .then((res) => {
        if(res.data) {
          if(res.data.role !== 'warehouse') {
            this.$router.push('/store_home')
          }
          if(res.data.role === 'warehouse' && res.data.roleNumber !== 'admin') {
            this.$router.push('/warehouse_home')
          }
        } else {
          this.$router.push('/')
        }
      })
      this.$store.dispatch('getProduct', this.$route.params.id)
  },
}
</script>

<style scoped>
.number-infos{
  font-size: 0.8em;
  font-weight: 300;
  margin-left: 5px;
}
.error{
  margin-bottom: 20px;
}
</style>
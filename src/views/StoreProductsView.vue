<template>
<StoreAddProduct v-if="this.$store.state.modeAddProduct === 'addProduct'" :product="product" />
<Header :title="'Commander'"/>
  <div class="back-head">
    <router-link to="/store_home" class="back-button">Retour</router-link>
    <router-link to="/store_cart" class="cart-button-icon">
      <img v-if="getCartForIcon.length > 0" src="../assets/cart.svg" class="cart-icon">
    </router-link>
    <div class="cart-button-icon-closed">
      <img v-if="getCartForIcon.length <= 0" src="../assets/cart-grey.svg" class="cart-icon">
    </div>
  </div>
  <div class="page">
    <div class="search-box">
      <select v-model="categorySelected" name="category" id="" class="search-input">
        <option value="">Toutes les Catégories</option>
        <option value="epicerie">Epicerie</option>
        <option value="frais">Frais</option>
        <option value="alcool">Alcool</option>
        <option value="soft">Soft</option>
        <option value="linge">Linge</option>
        <option value="emballage">Emballage</option>
        <option value="entretien">Entretien</option>
        <option value="materiel">Petits Matériels</option>
        <option value="autre">Autre</option>
      </select>
    </div>
    <div class="page-products">
      <div v-for="product in getProducts" :key="product.id">
        <div v-if="(product.category === categorySelected || categorySelected === '') && product.onSale === 'yes'" class="bloc-card">
          <div class="bloc-card-top">
            <div class="bloc-card-image-box">
              <img v-if="product.image" :src="product.image" alt="" class="bloc-card-image">
              <img v-if="!product.image" src="../assets/3.jpg" alt="" class="bloc-card-image no-pic">
            </div>
            <div class="bloc-add-product">
              <img v-if="checkProduct(product.id) === -1 && checkAvailability(product.id) > 0" @click="addProduct(product.id)" src="../assets/add-cart.svg" class="add-cart-icon">
              <div class="quantity-in-cart" v-if="checkProduct(product.id) !== -1">
                <div class="quantity">{{ checkQuantity(product.id) }}</div>
                <div class="cart-infos">dans le panier</div>
              </div>
              <div class="rupture" v-if="checkAvailability(product.id) === 0">Epuisé</div>
            </div>
          </div>
          <div class="bloc-card-infos-box">
            <h2 class="name">{{ product.name }}</h2>
            <h3>{{ product.description }}</h3>
            <p>Réf. {{ product.reference }}</p>
            <!-- <p>Catégorie : {{ product.category }}</p> -->
            <p>Colisage : <span class="bold">{{ product.packaging }}</span> unité(s)</p>
            <p>Format : <span class="bold">{{ product.size }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'
import StoreAddProduct from '@/components/StoreAddProduct.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'store_products',
  components: {
    Header,
    Footer,
    StoreAddProduct
  },
  data() {
    return {
      mode: "",
      product: null,
      categorySelected: ""
    }
  },
  computed: {
      ...mapGetters(['getProducts', 'getCartForIcon'])
  },
  methods: {
    addProduct(product) {
      this.$store.state.modeAddProduct = "addProduct"
      this.product = product
    },
    checkProduct(productId) {
      let cart = localStorage.getItem('cart')
      cart = JSON.parse(cart)
      if(cart != null) {
        const index = cart.findIndex(p => p.id === productId)
        return index
      } else {
        return -1
      }
    },
    checkQuantity(productId) {
      let cart = localStorage.getItem('cart')
      cart = JSON.parse(cart)
      const index = cart.findIndex(p => p.id === productId)
      return cart[index].quantity
    },
    checkAvailability(productId) {
      const index = this.getProducts.findIndex(p => p.id === productId)
      return this.getProducts[index].stocks.length
    },
  },
  created() {
    this.$store.dispatch('getProfile')
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getCartForIcon')
  }
}
</script>

<style scoped>
.search-box{
  width: 70%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.search-input{
  width: 200px;
  max-width: 250px;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 1em;
  background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
}
.search-input:focus{
  outline: none;
}
.search-input option{
  color: #000;
}
.page-products{
  padding-top: 30px;
}

.add-cart-icon{
  height: 30px;
  margin-right: 40px;
  cursor: pointer;
}
.quantity-in-cart{
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: green;
  width: 60px;
}
.quantity{
  font-size: 2em;
  font-weight: 600;
}
.rupture{
  margin-right: 30px;
  font-weight: 600;
}
.cart-infos{
  text-align: center;
  font-size: 0.8em;
}
.name{
  text-align: center;
  font-size: 1.4em;
}
@media (min-width: 700px) {
  .page{
    padding-top: 30px;
  }
}
</style>
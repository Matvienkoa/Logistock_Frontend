<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
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
      <div class="search-key-box">
        <img src="../assets/search.svg" alt="" class="search-key-icon">
        <input v-model="searchKey" @change="updateFiltersSearch(searchKey)" type="search" class="search-key" placeholder="Recherche...">
      </div>
      <select v-model="categorySelected" @change="updateFiltersCategory(categorySelected)" name="category" id="select-category" class="search-input">
        <option value="">Toutes les Catégories</option>
        <option :value="null">Sans Catégorie attribuée</option>
        <option v-for="category in getCategories" :key="category.id" :value="category.id">{{category.name}}</option>
      </select>
    </div>
    <div v-if="searchKey || categorySelected" @click="resetFilters()" class="close-filters">
      <p>Supprimer les filtres</p>
      <img crossorigin="anonymous" src="../assets/close-white.svg" alt="" class="close-white">
    </div>
    <p class="no-product-txt" v-if="checkIfProduct.length === 0">Aucun produit ne correspond à votre recherche</p>
    <div class="page-products">
      <div v-for="product in search" :key="product.id">
        <div v-if="(product.categoryId === categorySelected || categorySelected === '') && product.onSale === 'yes'" class="bloc-card">
          <div class="bloc-card-top">
            <div class="bloc-card-image-box">
              <img crossorigin="anonymous" v-if="product.image" :src="product.image" alt="" class="bloc-card-image">
              <img crossorigin="anonymous" v-if="!product.image" src="../assets/logo.png" alt="" class="bloc-card-image no-pic">
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
import instance from '@/axios';

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
      categorySelected: "",
      products: [],
      searchKey: "",
      isLoading: false,
    }
  },
  computed: {
      ...mapGetters(['getProfile', 'getProducts', 'getCartForIcon', 'getCategories', 'getFiltersCatalog']),
      search() {
        return this.products.filter((product) => {
          return product.name.toLowerCase().includes(this.searchKey.toLowerCase())
        })
      },
      checkIfProduct() {
        return this.search.filter((product) => {
          if ((product.categoryId === this.categorySelected || this.categorySelected === '') && product.onSale === 'yes') {
            return product
          }
        })
      }
  },
  methods: {
    updateFiltersCategory(value) {
      this.$store.state.filtersCatalog.category = value
    },
    updateFiltersSearch(value) {
      this.$store.state.filtersCatalog.search = value
    },
    resetFilters() {
      this.categorySelected = ""
      this.searchKey = ""
      this.$store.state.filtersCatalog.category = ""
      this.$store.state.filtersCatalog.search = ""
    },
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
    this.isLoading = true;
    this.$store.dispatch('checkToken')
    .then((res) => {
      if(res === 'expired') {
        this.$router.push('/')
      }
    })
    this.$store.dispatch('getProfile')
    .then((res) => {
      if(res.data) {
        if(res.data.role !== 'store') {
          this.$router.push('/warehouse_home')
        }
        instance.get(`/store/number/${res.data.roleNumber}`)
        .then((res) => {
          instance.get(`/product/store/${res.data.id}`)
          .then((res) => {
            this.products = res.data
          })
        })
      } else {
        this.$router.push('/')
      }
    })
    this.categorySelected = this.$store.state.filtersCatalog.category
    this.searchKey = this.$store.state.filtersCatalog.search
    this.$store.dispatch('getProducts')
    .then(() => {
      this.isLoading = false;
    })
    this.$store.dispatch('getCartForIcon')
    this.$store.dispatch('getCategories')
  }
}
</script>

<style scoped>
.page{
  flex-direction: column;
}
.search-box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}
.search-key-box{
  margin: 0;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  height: 30px;
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
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.search-input:focus{
  outline: none;
}
.search-input option{
  color: #000;
}
.close-filters{
  height: 30px;
}
.no-product-txt{
  width: 80%;
  text-align: center;
  margin-top: 60px;
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
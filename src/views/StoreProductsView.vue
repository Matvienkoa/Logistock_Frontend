<template>
<StoreAddProduct v-if="this.$store.state.modeAddProduct === 'addProduct'" :product="product" />
<Header :title="'Welcome'"/>
  <div class="page">
    <div class="page-head">
      <router-link to="/store_home">retour</router-link>
      <router-link to="/store_cart">mon panier</router-link>
    </div>
    <div class="search-box">
      recherche par catégories
    </div>
    <div class="page-products">
      <div v-for="product in getProducts" :key="product.id" class="product">
          <div class="head-product">
            <div class="photo-box-product">
              <img :src="product.image" alt="" class="photo-product">
            </div>
          </div>
          <div class="body-product">
            <div>{{ product.reference }}</div>
            <div>{{ product.name }}</div>
            <div>{{ product.description }}</div>
            <div>{{ product.category }}</div>
            <div>{{ product.packaging }}</div>
            <div>{{ product.size }}</div>
          </div>
          <div class="add-product">
            <button v-if="checkProduct(product.id) === -1 && checkAvailability(product.id) > 0" @click="addProduct(product.id)">Ajouter</button>
          </div>
          <div v-if="checkProduct(product.id) !== -1">
            {{ checkQuantity(product.id) }} souhaités
          </div>
          <div v-if="checkAvailability(product.id) === 0">
            rupture
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
      product: null
    }
  },
  computed: {
      ...mapGetters(['getProducts'])
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
    }
  },
  created() {
    this.$store.dispatch('getProfile')
    this.$store.dispatch('getProducts')
    console.log(JSON.parse(localStorage.getItem('cart')))
  }
}
</script>

<style scoped>
/* Page */
.page{
  width: 100%;
}
/* Head Page */
.page-head{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
/* Search */

/* Products */
.page-products{
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

/* Product */
.product{
  width: 200px;
  
  background-color: rgb(204, 204, 204);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head-product{
  display: flex;
  justify-content: center;
  align-items: center;
}
.photo-box-product{
  height: 100px;
  width: 100px;
  overflow: hidden;
  border-radius: 50px;

}
.photo-product{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
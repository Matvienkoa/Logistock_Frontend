<template>
<StoreEditQuantity v-if="this.$store.state.modeEditQuantity === 'editQuantity'" :product="product" />
<StoreConfirmCart v-if="this.$store.state.modeConfirmCart === 'confirmCart'" />
<Header :title="'Welcome'"/>
  <div class="page">
    <div class="page-head">
      <router-link to="/store_products">retour</router-link>
      <button @click="confirmCart()">Valider mon panier</button>
    </div>

    <div class="page-products">
      <div v-for="product in getCart" :key="product.id" class="product">
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
          <div>
            {{ getQuantity(product.id) }} dans le panier
          </div>
          <div class="edit-quantity">
            <button @click="editQuantity(product.id)">Modifier</button>
          </div>
          <div>
            <button @click="removeProduct(product.id)">Retirer</button>
          </div>
      </div>
    </div>
    
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'
import StoreEditQuantity from '@/components/StoreEditQuantity.vue'
import StoreConfirmCart from '@/components/StoreConfirmCart.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'store_cart',
  components: {
    Header,
    Footer,
    StoreEditQuantity,
    StoreConfirmCart
  },
  data() {
    return {
      mode: "",
      product: null
    }
  },
  computed: {
      ...mapGetters(['getCart'])
  },
  methods: {
    confirmCart() {
      this.$store.state.modeConfirmCart = "confirmCart"
    },
    removeProduct(product) {
        let cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        const index = cart.findIndex(p => p.id === product)
        if (index !== -1) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        if(cart != null) {
            this.$store.dispatch('getCart', cart)
        }
    },
    editQuantity(product) {
        this.$store.state.modeEditQuantity = "editQuantity"
        this.product = product
    },
    getProductsInCart() {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(cart != null) {
            this.$store.dispatch('getCart', cart)
        }
        
    },
    getQuantity(productId) {
        let cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        const index = cart.findIndex(p => p.id === productId)
        return cart[index].quantity
    }
  },
  created() {
    this.getProductsInCart()
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
<template>
<StoreEditQuantity v-if="this.$store.state.modeEditQuantity === 'editQuantity'" :product="product" />
<StoreConfirmCart v-if="this.$store.state.modeConfirmCart === 'confirmCart'" />
<Header :title="'Mon Panier'"/>
  <div class="back-head">
      <router-link to="/store_products" class="back-button">Retour</router-link>
      <div v-if="getCart.length > 0" @click="confirmCart()" class="cart-button">Valider mon panier</div>
    </div>
  <div class="page">
    <div v-if="getCart.length <= 0" class="no-result">Votre Panier est vide</div>
    <router-link v-if="getCart.length <= 0" to="/store_products" class="add-product-button">Ajouter des Produits</router-link>
    <div class="page-products">
      <div v-for="product in getCart" :key="product.id" class="bloc-card">
          <div class="bloc-card-top">
            <div class="bloc-card-image-box">
              <img :src="product.image" alt="" class="bloc-card-image">
            </div>
            <div class="quantity-in-cart">
              <div class="quantity-box">
                <div class="quantity-infos">Qté. </div>
                <div class="quantity"> {{getQuantity(product.id)}}</div>
              </div>
              <div class="edit-buttons">
                <div class="edit-button-cart" @click="editQuantity(product.id)">Modifier</div>
                <img class="delete-button-cart" @click="removeProduct(product.id)" src="../assets/trash.svg" alt="">
              </div> 
            </div>
          </div>
          <div class="bloc-card-infos-box">
            <p class="name">{{ product.name }}</p>
            <p>Réf. : {{ product.reference }}</p>
            <p>Colisage : {{ product.packaging }} / Colis</p>
            <p>Format : {{ product.size }}</p>
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
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(cart != null) {
          const index = cart.findIndex(p => p.id === productId)
          return cart[index].quantity
        }
        
    }
  },
  created() {
    this.getProductsInCart()
    this.$store.state.modeEditQuantity = ''
    this.$store.state.modeConfirmCart = ''
  }
}
</script>

<style scoped>
.page{
  padding-top: 30px;
}
.page-products{
  padding-top: 30px;
}
.add-product-button{
  text-decoration: none;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
}
.quantity-in-cart{
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100px;
}
.quantity-box{
  display: flex;
  align-items: center;
  color: green;
}
.quantity-infos{
  font-size: 0.8em;
}
.quantity{
  font-size: 2.2em;
  font-weight: 600;
  margin-left: 5px;
}
.edit-buttons{
  display: flex;
  margin-bottom: 20px;
}
.edit-button-cart{
  cursor: pointer;
  color: white;
  background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
  border-radius: 10px;
  border: none;
  font-size: 0.8em;
  padding: 3px 8px;
}
.delete-button-cart{
  cursor: pointer;
  height: 20px;
  margin-left: 10px;
}
.name{
  text-align: center;
  font-size: 1.4em;
  margin-bottom: 10px;
}
</style>
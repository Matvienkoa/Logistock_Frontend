<template>
<Header :title="'Référence'"/>
  <div class="back-head">
    <router-link to="/warehouse_products" class="back-button">Retour</router-link>
  </div>
  <div class="page-mono">
    <div class="page-mono-product">
      <div class="product-image-bloc">
        <img :src="getProduct.image" alt="" class="product-image">
      </div>
      
      <div class="product-infos">
        <h1 class="mono-product-name">{{ getProduct.name }}</h1>
        <p>Référence : {{getProduct.reference}}</p>
        <p>Description : {{getProduct.description}}</p>
        <p>Catégorie : {{getProduct.category}}</p>
        <p>Format : {{getProduct.size}}</p>
        <p>Colisage : {{getProduct.packaging}} unités / colis</p>
        <p>Fournisseur : {{supplier}}</p>
        <p>Délai d'approvisionnement : {{getProduct.leadTime}}</p>
        <p>TVA : {{getProduct.tva}} %</p>
        <p v-if="getProduct.onSale === 'yes'">Disponible à la Vente</p>
        <p v-if="getProduct.onSale === 'no'">Indisponible à la Vente</p>
      </div>
    </div>
    
    <div class="page-mono-buttons">
      <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_edit_product', params: {id: getProduct.id}}" class="edit-button">
        modifier
      </router-link>
      <div v-if="getProduct.onSale === 'yes'" class="delete-button" @click="switchToConfirm()">Retirer</div>
      <div v-if="getProduct.onSale === 'no'" class="delete-button" @click="switchToConfirm()">Rendre disponible</div>
    </div>
    <div class="show-confirm" v-if="mode === 'confirm' && getProduct.onSale === 'yes'">
        <p class="confirm-text">Retirer le produit de la vente?</p>
        <div class="choice-box">
            <button class="confirm-button" @click="deleteProduct()">Retirer</button>
            <div class="cancel-button" @click="cancelConfirm()">Annuler</div>
        </div>
    </div>
    <div class="show-confirm" v-if="mode === 'confirm' && getProduct.onSale === 'no'">
        <p class="confirm-text">Remettre le produit en vente?</p>
        <div class="choice-box">
            <button class="confirm-button" @click="saleProduct()">Remettre</button>
            <div class="cancel-button" @click="cancelConfirm()">Annuler</div>
        </div>
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
  name: 'warehouse_product',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          mode: "",
          supplier: ""
      }
  },
  computed: {
        ...mapGetters(['getProduct'])
  },
  methods: {
    switchToConfirm() {
        this.mode = 'confirm'
    },
    cancelConfirm() {
        this.mode = ''
    },
    deleteProduct() {
      instance.put(`/product/onSale/${this.$route.params.id}`, {
        onSale: 'no'
      })
      .then((res) => {
          if(res.status === 200) {
              this.$router.push(`/warehouse_products`)
          }
      })
    },
    saleProduct() {
      instance.put(`/product/onSale/${this.$route.params.id}`, {
        onSale: 'yes'
      })
      .then((res) => {
          if(res.status === 200) {
              this.$router.push(`/warehouse_products`)
          }
      })
    }
  },
  created: function () {
      this.$store.dispatch('getProduct', this.$route.params.id)
      .then((res) => {
        console.log(res.data)
        this.$store.dispatch('getSupplier', res.data.supplierId)
        .then((res) => {
          this.supplier = res.data.name
        })
      })
  },
}
</script>
<style>
.page-mono-product{
  width: 100%;
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-image-bloc{
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}
.product-image{
  width: 100%;
  height: auto;
}
.product-infos{
  width: 60%;
}
.mono-product-name{
  text-align: center;
  margin-bottom: 20px;
}
@media (min-width: 700px) {
  .page-mono-product{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .product-image-bloc{
    width: 300px;
    height: 300px;
    margin-right: 20px;
  }
  .product-infos{
    width: unset;
  }
  .page-mono-buttons{
    margin-top: 50px;
  }
}
</style>

<style scoped>
.edit-button{
  margin-right: 10px;
}
</style>
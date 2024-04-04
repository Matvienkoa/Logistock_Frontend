<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Référence'"/>
  <div class="back-head">
    <router-link to="/warehouse_products" class="back-button">Retour</router-link>
  </div>
  <div class="page-mono">
    <div class="page-mono-product">
      <div class="product-image-bloc">
        <img crossorigin="anonymous" v-if="getProduct.image" :src="getProduct.image" alt="" class="product-image">
        <img crossorigin="anonymous" v-if="!getProduct.image" src="../assets/logo.png" alt="" class="product-image no-pic">
      </div>
      <div class="product-infos">
        <h1 class="mono-product-name">{{ getProduct.name }}</h1>
        <p>Référence : {{getProduct.reference}}</p>
        <p>Description : {{getProduct.description}}</p>
        <p>Catégorie : {{category}}</p>
        <p>Format : {{getProduct.size}}</p>
        <p>Colisage : {{getProduct.packaging}} unités / colis</p>
        <p>Fournisseur : {{supplier}}</p>
        <p>Délai d'approvisionnement : {{getProduct.leadTime}}</p>
        <p>TVA : {{getProduct.tva}} %</p>
        <p class="on-sale" v-if="getProduct.onSale === 'yes'">Disponible à la Vente<img class="circle-order" src="../assets/circle-validated.svg" alt=""></p>
        <p class="on-sale" v-if="getProduct.onSale === 'no'">Indisponible à la Vente<img class="circle-order" src="../assets/circle-pending.svg" alt=""></p>
      </div>
    </div>
    <div class="product-perm-box">
      <p class="product-perm-title">Visible pour :<span v-if="permissions.length === 0"> Aucun point de vente</span></p>
      <div class="product-perm-stores">
        <div class="product-perm-store" v-for="permission in permissions" :key="permission.id">{{permission.storeName}}</div>
      </div>
      <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_edit_permissions_product', params: {id: getProduct.id}}" class="edit-button button-inbox">
        Modifier les permissions
      </router-link>
    </div>
    <div class="product-perm-box perm-box-price">
      <p class="product-perm-price">Prix de vente : <span class="bolder">{{(getProduct.sellingPrice/100).toFixed(2)}} €</span></p>
      <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_edit_selling_price_product', params: {id: getProduct.id}}" class="edit-button button-inbox">
        Gérer le prix de vente
      </router-link>
    </div>
    <div class="page-mono-buttons">
      <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_edit_product', params: {id: getProduct.id}}" class="edit-button">
        Modifier
      </router-link>
      <div v-if="getProduct.onSale === 'yes'" class="delete-button" @click="switchToConfirm()">Retirer</div>
      <div v-if="getProduct.onSale === 'no'" class="delete-button" @click="switchToConfirm()">Rendre disponible</div>
    </div>
    <div class="popup-confirm-page" v-if="mode === 'confirm' && getProduct.onSale === 'yes'">
      <div class="popup-confirm-box">
        <p class="popup-confirm-text">Retirer le produit de la vente?</p>
        <div class="popup-choice-box">
            <button class="popup-confirm-button" @click="outProduct()">Retirer</button>
            <div class="popup-cancel-button" @click="cancelConfirm()">Annuler</div>
        </div>
      </div>
    </div>
    <div class="popup-confirm-page" v-if="mode === 'confirm' && getProduct.onSale === 'no'">
      <div class="popup-confirm-box">
        <p class="popup-confirm-text">Remettre le produit en vente?</p>
        <div class="popup-choice-box">
            <button class="popup-confirm-button" @click="saleProduct()">Remettre</button>
            <div class="popup-cancel-button" @click="cancelConfirm()">Annuler</div>
        </div>
      </div>
    </div>
    <div class="delete-button alone" @click="switchToConfirm2()">Supprimer</div>
    <div class="popup-confirm-page" v-if="mode2 === 'confirm'">
      <div class="popup-confirm-box">
        <p class="popup-confirm-text">Supprimer la référence?</p>
        <img src="../assets/danger-red.svg" alt="" class="popup-danger">
        <p class="popup-confirm-text">Si vous supprimez la référence, elle n'apparaîtra plus dans les statistiques de ventes!<br>
        Supprimer définitivement ?</p>
        <div class="popup-choice-box">
          <button class="popup-confirm-button" @click="deleteProduct()">Supprimer Définitvement</button>
          <div class="popup-cancel-button" @click="cancelConfirm2()">Annuler</div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom"></div>
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
          mode2: "",
          supplier: "",
          category: "",
          permissions: [],
          isLoading: false,
      }
  },
  computed: {
        ...mapGetters(['getProduct'])
  },
  methods: {
    switchToConfirm() {
        this.mode = 'confirm'
    },
    switchToConfirm2() {
        this.mode2 = 'confirm'
    },
    cancelConfirm() {
        this.mode = ''
    },
    cancelConfirm2() {
        this.mode2 = ''
    },
    outProduct() {
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
    },
    deleteProduct() {
      instance.delete(`/product/${this.$route.params.id}`)
      .then((res) => {
          if(res.status === 200) {
              this.$router.push(`/warehouse_products`)
          }
      })
    }
  },
  created: function () {
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
      .then((res) => {
        if(res.data.supplierId !== null) {
          this.$store.dispatch('getSupplier', res.data.supplierId)
          .then((res) => {
            this.supplier = res.data.name
          })
        } else {
          this.supplier = 'Pas de fournisseur attribué'
        }
        if(res.data.categoryId !== null) {
          this.$store.dispatch('getCategory', res.data.categoryId)
          .then((res) => {
            this.category = res.data.name
          })
        } else {
          this.category = 'Pas de catégorie attribuée'
        }
        this.isLoading = false;
      })
      instance.get(`/permission/${this.$route.params.id}`)
      .then((res) => {
        this.permissions = res.data
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
  height: 100%;
  object-fit: contain;
}
.product-infos{
  width: 90%;
}
.mono-product-name{
  text-align: center;
  margin-bottom: 20px;
}
.on-sale{
  display: flex;
}
.product-perm-box{
  background-color: #f3f3f3;
  width: 85%;
  max-width: 600px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-perm-title{
  margin-bottom: 10px;
  align-self: center;
}
.product-perm-stores{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.product-perm-store{
  background-color: #41b883;
  color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  font-size: 0.9em;
  margin-bottom: 5px;
  margin-right: 5px;
}
.perm-box-price{
  max-width: 300px;
}
.product-perm-price{
  align-self: center;
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
    margin-right: 40px;
  }
  .product-infos{
    width: unset;
  }
  .page-mono-buttons{
    margin-top: 30px;
  }
}
</style>

<style scoped>
.button-inbox{
  align-self: center;
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 5px;
}
.bolder{
  font-weight: 600;
}
.alone{
  margin-top: 30px;
  font-size: 0.9em;
}
.show-danger{
  display: flex;
  align-items: center;
  margin: auto;
  max-width: 600px;
}
.danger{
  width: 30px;
  margin-right: 5px;
}
.confirm-text{
  color: red;
  font-size: 0.9em;
  margin-bottom: 10px;
}
</style>
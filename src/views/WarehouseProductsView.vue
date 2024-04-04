<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Références'"/>
  <div class="back-head">
    <router-link to="/warehouse_stock" class="back-button">Retour</router-link>
    <router-link to="/warehouse_add_product" class="cart-button">Créer un produit</router-link>
  </div>
  <div class="category-box">
    <router-link to="/warehouse_categories" class="category-button">Gérer mes catégories</router-link>
  </div>
  <div class="search-box">
    <div class="search-key-box">
      <img src="../assets/search.svg" alt="" class="search-key-icon">
      <input id="search-key-input" v-model="searchKey" @change="updateFiltersSearch(searchKey)" type="search" class="search-key" placeholder="Recherche...">
    </div>
    <select v-model="categorySelected" @change="updateFiltersCategory(categorySelected)" name="category" id="select-category" class="search-input">
      <option value="">Toutes les Catégories</option>
      <option :value="null">Sans Catégorie attribuée</option>
      <option v-for="category in getCategories" :key="category.id" :value="category.id">{{category.name}}</option>
    </select>
    <select v-model="supplierSelected" @change="updateFiltersSupplier(supplierSelected)" name="supplier" id="select-supplier" class="search-input">
      <option value="">Tous les Fournisseurs</option>
      <option :value="null">Sans fournisseur attribué</option>
      <option v-for="supplier in getSuppliers" :key="supplier.id" :value="supplier.id">{{supplier.name}}</option>
    </select>
    <select v-model="onSale" @change="updateFiltersOnSale(onSale)" name="onSale" id="select-onsale" class="search-input">
      <option value="">Disponibilité</option>
      <option value="yes">Disponibles à la vente</option>
      <option value="no">Indisponibles à la vente</option>
    </select>
    <div v-if="searchKey || categorySelected || supplierSelected || onSale" @click="resetFilters()" class="close-filters">
      <p>Supprimer les filtres</p>
      <img crossorigin="anonymous" src="../assets/close-white.svg" alt="" class="close-white">
    </div>
  </div>
  <div class="page-products">
    <div class="no-result" v-if="products.length === 0">Vous n'avez pas enregistré de Produit</div>
    <p class="no-result" v-if="checkIfProduct.length === 0 && products.length !== 0">Aucun produit ne correspond à votre recherche</p>
    <div v-for="product in search" :key="product.id">
      <router-link v-if="(product.categoryId === categorySelected || categorySelected === '') && (product.supplierId === supplierSelected || supplierSelected === '') && (product.onSale === onSale || onSale === '')" :to="{name: 'warehouse_product', params: {id: product.id}}" class="bloc-card">
        <img v-if="product.onSale === 'yes'" class="circle-order" src="../assets/circle-validated.svg" alt="">
        <img v-if="product.onSale === 'no'" class="circle-order" src="../assets/circle-pending.svg" alt="">
        <div class="bloc-card-image-box">
          <img crossorigin="anonymous" v-if="product.image" :src="product.image" alt="" class="bloc-card-image">
          <img crossorigin="anonymous" v-if="!product.image" src="../assets/logo.png" alt="" class="bloc-card-image no-pic">
        </div>
        <div class="bloc-card-infos-box">
          <h2>{{ product.name }}</h2>
          <p>Réf. {{ product.reference }}</p>
          <p>Format : <span class="bold">{{ product.size }}</span></p>
          <p>Colisage : <span class="bold">{{product.packaging}}</span> unité(s)</p>
        </div> 
      </router-link>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_products',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      categorySelected: "",
      supplierSelected: "",
      onSale: "",
      products: [],
      searchKey: "",
      isLoading: false,
    }
  },
  computed: {
      ...mapGetters(['getProducts', 'getSuppliers', 'getCategories', 'getFiltersProducts']),
      search() {
        return this.products.filter((product) => {
          return product.name.toLowerCase().includes(this.searchKey.toLowerCase())
        })
      },
      checkIfProduct() {
        return this.search.filter((product) => {
          if ((product.categoryId === this.categorySelected || this.categorySelected === '') && (product.supplierId === this.supplierSelected || this.supplierSelected === '') && (product.onSale === this.onSale || this.onSale === '')) {
            return product
          }
        })
      }
  },
  methods: {
    updateFiltersCategory(value) {
      this.$store.state.filtersProducts.category = value
    },
    updateFiltersSupplier(value) {
      this.$store.state.filtersProducts.supplier = value
    },
    updateFiltersOnSale(value) {
      this.$store.state.filtersProducts.onSale = value
    },
    updateFiltersSearch(value) {
      this.$store.state.filtersProducts.search = value
    },
    resetFilters() {
      this.categorySelected = ""
      this.supplierSelected = ""
      this.searchKey = ""
      this.onSale = ""
      this.$store.state.filtersProducts.category = ""
      this.$store.state.filtersProducts.supplier = ""
      this.$store.state.filtersProducts.onSale = ""
      this.$store.state.filtersProducts.search = ""
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
      this.categorySelected = this.$store.state.filtersProducts.category
      this.supplierSelected = this.$store.state.filtersProducts.supplier
      this.onSale = this.$store.state.filtersProducts.onSale
      this.searchKey = this.$store.state.filtersProducts.search
      this.$store.dispatch('getProducts')
      .then((res) => {
        this.products = res.data
        this.isLoading = false;
      })
      this.$store.dispatch('getSuppliers')
      this.$store.dispatch('getCategories')
  },
}
</script>

<style>
.search-key-box{
  position: relative;
  display: flex;
  align-items: center;
  height: 25px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.search-key-icon{
  width: 20px;
  margin-right: 5px;
}
.search-key{
  width: 175px;
  max-width: 225px;
  height: 100%;
  border-radius: 10px;
  font-size: 0.9em;
  padding: 0 10px;
}
.close-filters{
  width: 200px;
  max-width: 250px;
  height: 25px;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 0.9em;
  background: rgb(214, 19, 19);
  margin-bottom: 10px;
}
.close-white{
  width: 12px;
}
.page-products{
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  margin-bottom: 40px;
  padding-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.bloc-card{
  position: relative;
  width: 250px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 40px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 10px 0;
}
.bloc-card-top{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.bloc-card-image-box{
  width: 100px;
  height: 100px;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  margin-left: 10px;
  margin-bottom: 10px;
}
.bloc-card-image{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.no-pic{
  opacity: 0.6;
}
.bloc-card-infos-box{
  width: 93%;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgb(243, 243, 243);
  border-radius: 10px;
  padding: 10px 0;
}
.bloc-card-infos-box h2{
  text-align: center;
  font-weight: 550;
  margin: auto;
  margin-bottom: 10px;
  width: 95%;
}
.bloc-card-infos-box h3{
  text-align: center;
  width: 90%;
  margin: auto;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 0.9em;
}
.bloc-card-infos-box p{
  margin-left: 10px;
  margin-right: 10px;
}
</style>

<style scoped>
.category-box{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
}
.category-button{
  background-image: linear-gradient(52deg, rgb(132, 193, 233),rgb(44, 102, 189));
  text-decoration: none;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9em;
}
.page-products{
  padding-top: 30px;
}
.search-box{
  width: 100%;
  margin: auto;
  max-width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.search-input{
  width: 200px;
  max-width: 250px;
  height: 25px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 0.9em;
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
.no-result{
  margin-top: unset;
  margin-bottom: 40px;
}
.circle-order{
  position: absolute;
  right: 10px;
}

/* Responsiv */
@media (min-width: 700px) {
  .category-box{
    margin-top: 15px;
  }
  .search-box{
    margin-top: 40px;
  }
}
</style>
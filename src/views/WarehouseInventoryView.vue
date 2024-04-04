<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Stocks'"/>
  <div class="back-head">
    <router-link to="/warehouse_stock" class="back-button">Retour</router-link>
  </div>
  <div class="page">
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
    <div class="no-result" v-if="products.length === 0">Vous n'avez pas enregistré de Produit</div>
    <p class="no-result" v-if="checkIfProduct.length === 0 && products.length !== 0">Aucun produit ne correspond à votre recherche</p>
    <div class="page-stocks">
      <div v-for="product in search" :key="product.id">
        <router-link v-if="(product.categoryId === categorySelected || categorySelected === '') && (product.supplierId === supplierSelected || supplierSelected === '') && (product.onSale === onSale || onSale === '')" :to="{name: 'warehouse_inventory_product', params: {id: product.id}}" class="link-products">
          <img v-if="product.onSale === 'yes'" class="circle-order" src="../assets/circle-validated.svg" alt="">
          <img v-if="product.onSale === 'no'" class="circle-order" src="../assets/circle-pending.svg" alt="">
          <div class="title-box-products">
            <div class="img-box-products">
              <img crossorigin="anonymous" v-if="product.image" :src="product.image" alt="" class="img-products">
              <img crossorigin="anonymous" v-if="!product.image" src="../assets/logo.png" alt="" class="img-products no-pic">
            </div>
            <div>{{ product.name }}</div>
          </div>
          <div class="infos-box-products">
            <div class="infos-products">
              <div>Réf : {{ product.reference }}</div>
              <div>Format : {{ product.size }}</div>
              <div>Colisage : {{ product.packaging }}</div>
            </div>
            <div class="stocks-products">
              <div v-if="getTotalStock(product.stocks) > 0" class="stocks-products-ok">Stocks : {{ getTotalStock(product.stocks) }}</div>
              <div v-if="getTotalStock(product.stocks) <= 0" class="stocks-products-not-ok">Rupture</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_inventory',
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
    ...mapGetters(['getProducts', 'getSuppliers', 'getCategories', 'getFiltersStocks']),
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
      this.$store.state.filtersStocks.category = value
    },
    updateFiltersSupplier(value) {
      this.$store.state.filtersStocks.supplier = value
    },
    updateFiltersOnSale(value) {
      this.$store.state.filtersStocks.onSale = value
    },
    updateFiltersSearch(value) {
      this.$store.state.filtersStocks.search = value
    },
    resetFilters() {
      this.categorySelected = ""
      this.supplierSelected = ""
      this.searchKey = ""
      this.onSale = ""
      this.$store.state.filtersStocks.category = ""
      this.$store.state.filtersStocks.supplier = ""
      this.$store.state.filtersStocks.onSale = ""
      this.$store.state.filtersStocks.search = ""
    },
    getTotalStock(stocks) {
      let totalStock = 0;
      stocks.forEach(stock => {
        totalStock += stock.quantity
      });
      return totalStock
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
    this.categorySelected = this.$store.state.filtersStocks.category
    this.supplierSelected = this.$store.state.filtersStocks.supplier
    this.onSale = this.$store.state.filtersStocks.onSale
    this.searchKey = this.$store.state.filtersStocks.search
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
.link-products{
  position: relative;
  width: 80%;
  max-width: 300px;
  margin-bottom: 20px;
  padding: 10px 0;
  text-decoration: none;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 10px;
}
.title-box-products{
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.img-box-products{
  width: 60px;
  height: 60px;
  overflow: hidden;
  margin-right: 20px;
}
.img-products{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.infos-box-products{
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stocks-products-ok{
  color: green;
  font-weight: 700;
}
.stocks-products-not-ok{
  color: red;
  font-weight: 700;
}
</style>

<style scoped>
.search-box{
  width: 100%;
  margin: auto;
  max-width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
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
.page-stocks{
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.link-products{
  width: 280px;
  margin-left: 10px;
  margin-right: 10px;
}
.circle-order{
  position: absolute;
  right: 10px;
}
</style>
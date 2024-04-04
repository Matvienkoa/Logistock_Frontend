<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Valeur Stock'"/>
    <div class="back-head">
        <router-link to="/warehouse_admin" class="back-button">Retour</router-link>
        <div class="cart-button" v-if="searchKey === ''" @click="download()">Exporter les produits</div>
    </div>
    <div class="page">
        <div class="search-key-box">
            <img src="../assets/search.svg" alt="" class="search-key-icon">
            <input id="input-searchkey" v-model="searchKey" type="search" class="search-key" placeholder="Recherche...">
        </div>
        <div class="page-amount-infos">Valeur Marchande Totale : <span class="total">{{value.toFixed(2)}} €</span></div>
        <p class="no-result" v-if="search.length === 0">Aucun produit ne correspond à votre recherche</p>
        <Product v-for="product in search" :key="product.id" :id="product.id" />
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehouseAdminStocksProduct.vue'
import { mapGetters } from 'vuex';
import instance from '@/axios';
import xlsx from "json-as-xlsx"

export default {
    name: 'warehouse_admin_stocks',
    components: {
        Header,
        Footer,
        Product,
    },
    data() {
        return {
            value: 0,
            products: [],
            searchKey: "",
            isLoading: false,
            data: [
                {
                    sheet: "Produits",
                    columns: [
                        { label: "Produit", value: "name" },
                        { label: "Référence", value: "reference" },
                        { label: "Catégorie", value: "category" },
                        { label: "Quantité en stock", value: "qty" },
                        { label: "Valeur Marchande", value: "value" },
                        { label: "TVA", value: "tva" },
                        { label: "Prix de vente", value: "sellingPrice" },
                    ],
                    content: [],
                },
            ],
            settings: {
                fileName: "Produits",
                writeMode: "writeFile"
            }
        }
    },
    computed: {
      ...mapGetters(['getProducts']),
      search() {
        return this.products.filter((product) => {
          return product.name.toLowerCase().includes(this.searchKey.toLowerCase())
        })
      }
    },
    methods: {
        download() {
            instance.post('/product/xls')
            .then((res) => {
                this.data[0].content = res.data
                xlsx(this.data, this.settings)
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
        this.$store.dispatch('getProducts')
        .then((res) => {
            this.products = res.data
        })
        instance.get('/stock/')
        .then((res) => {
            res.data.forEach(stock => {
                let value = stock.quantity * stock.buyingPrice/100
                this.value += value
            });
            this.isLoading = false;
        })
    },
}
</script>

<style scoped>
.page{
    flex-direction: column;
}
.search-key-box{
    margin-bottom: 20px;
}
.page-amount-infos{
    width: 80%;
    margin: auto;
    max-width: 600px;
    margin-bottom: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.total{
    font-weight: bold;
    color: green;
    font-size: 1.4em;
    margin-left: 5px;
}
</style>
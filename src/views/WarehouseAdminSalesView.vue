<template>
<Header :title="'Ventes'"/>
    <div class="back-head">
        <router-link to="/warehouse_admin" class="back-button">retour</router-link>
    </div>
    <div class="page-search">
        <div v-if="mode === 'hideProducts'" class="search">
            <select class="select-search item-search" v-model="supplierSelected" name="" id="">
                <option value="">Tous les fournisseurs</option>
                <option v-for="supplier in getSuppliers" :key="supplier.id" :value="supplier.id">{{supplier.name}}</option>
            </select>
            <select class="select-search item-search" v-model="storeSelected" name="" id="">
                <option value="">Tous les Points de vente</option>
                <option v-for="store in getStores" :key="store.id" :value="store.id">{{store.name}}</option>
            </select>
            <div class="item-search">
                <label for="">Date de début :</label>
                <input v-model="startDate" type="date" name="" id="">
            </div>
            <div class="item-search">
                <label for="">Date de fin :</label>
                <input v-model="endDate" type="date" name="" id="">
            </div>
        </div>

        <div v-if="mode === 'showProducts'" class="page-resume">
            <p>Fournisseur : {{checkSupplier(supplierSelected)}}</p>
            <p>Point de vente : {{checkStore(storeSelected)}}</p>
            <p>Du : {{checkStartDate(startDate)}} Au : {{checkEndDate(endDate)}}</p>
        </div>

        <button class="search-button" v-if="mode === 'hideProducts'" @click="showProducts()">Valider</button>
        <button class="reset-button" v-if="mode === 'showProducts'" @click="hideProducts()">Nouvelle recherche</button>

        <div class="page-results" v-if="mode === 'showProducts'">
            <div class="result-products" v-for="product in getProducts" :key="product.id">
                <Product v-if="product.supplierId === supplierSelected || supplierSelected === ''" :id="product.id" :store="storeSelected" :supplier="supplierSelected" :start="startDate" :end="endDate" />
            </div>
        </div>
    </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehouseAdminSalesProduct.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_admin_sales',
    components: {
        Header,
        Footer,
        Product
    },
    data() {
        return {
            supplierSelected: "",
            storeSelected: "",
            mode: "hideProducts",
            startDate: "",
            endDate: "",
        }
    },
    computed: {
      ...mapGetters(['getStores', 'getSuppliers', 'getProducts']),
    },
    methods: {
        showProducts() {
            this.mode = 'showProducts'
        },
        hideProducts() {
            this.mode = 'hideProducts'
        },
        checkSupplier(supplierId) {
            let supplier = "";
            if(supplierId === "") {
                supplier = "Tous"
            } else {
                const index = this.getSuppliers.findIndex(s => s.id === supplierId)
                supplier = this.getSuppliers[index].name
            }
            return supplier
        },
        checkStore(storeId) {
            let store = "";
            if(storeId === "") {
                store = "Tous"
            } else {
                const index = this.getStores.findIndex(s => s.id === storeId)
                store = this.getStores[index].name
            }
            return store
        },
        checkStartDate(date) {
            let start = date;
            if(date === "") {
                start = 'Toute Date'
            }
            return start
        },
        checkEndDate(date) {
            let end = date;
            if(date === "") {
                end = "Aujourd'hui"
            }
            return end
        }
    },
    created: function () {
        this.$store.dispatch('getStores')
        this.$store.dispatch('getSuppliers')
        this.$store.dispatch('getProducts')
    },
}
</script>

<style>
.page-search{
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.search{
    width: 100%;
    max-width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.page-resume{
    width: 100%;
    max-width: 700px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.item-search{
    margin: 5px 5px;
}
.select-search{
    width: 150px;
}
.search-button{
    margin-top: 20px;
}
.search-button, .reset-button{
    font-size: 1em;
    padding: 7px 25px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
}
.page-results{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
}
.result-products{
    width: 100%;
    max-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
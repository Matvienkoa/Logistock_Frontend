<template>
<Header :title="'Ventes'"/>
    <div class="back-head">
        <router-link to="/warehouse_admin" class="back-button">Retour</router-link>
    </div>
    <div class="page-search">
        <div v-if="mode === 'hideProducts'" class="search-box">
            <select class="search-input" v-model="supplierSelected" name="" id="">
                <option value="">Tous les fournisseurs</option>
                <option v-for="supplier in getSuppliers" :key="supplier.id" :value="supplier.id">{{supplier.name}}</option>
            </select>
            <select class="search-input" v-model="storeSelected" name="" id="">
                <option value="">Tous les Points de vente</option>
                <option v-for="store in getStores" :key="store.id" :value="store.id">{{store.name}}</option>
            </select>
            <div class="item-search">
                <label for="">Date de début : </label>
                <input @input="cancelError()" v-model="startDate" type="date" name="" class="date-input">
            </div>
            <div class="item-search">
                <label for="">Date de fin : </label>
                <input @input="cancelError()" v-model="endDate" type="date" name="" class="date-input">
            </div>
        </div>

        <div v-if="mode === 'showProducts'" class="page-resume">
            <p>Fournisseur : <span class="bold">{{checkSupplier(supplierSelected)}}</span></p>
            <p>Point de vente : <span class="bold">{{checkStore(storeSelected)}}</span></p>
            <p>Début : <span class="bold">{{checkStartDate(startDate)}}</span></p>
            <p>Fin : <span class="bold">{{checkEndDate(endDate)}}</span></p>
        </div>

        <div class="error" v-if="error">{{ error }}</div>

        <button class="search-button" v-if="mode === 'hideProducts'" @click="showProducts()">Valider</button>
        <button class="reset-button" v-if="mode === 'showProducts'" @click="hideProducts()">Nouvelle recherche</button>

        <div class="page-results" v-if="mode === 'showProducts'">
            <div class="result-products" v-for="product in getProducts" :key="product.id">
                <Product v-if="product.supplierId === supplierSelected || supplierSelected === ''" :id="product.id" :store="storeSelected" :supplier="supplierSelected" :start="startDate" :end="endDate" />
            </div>
        </div>
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehouseAdminSalesProduct.vue'
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

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
            error: "",
            moment: moment
        }
    },
    computed: {
      ...mapGetters(['getStores', 'getSuppliers', 'getProducts']),
    },
    methods: {
        cancelError() {
            this.error = ''
        },
        showProducts() {
            if(this.startDate > this.endDate) {
                this.error = 'Merci de sélectionner des dates cohérentes'
            } else {
                this.mode = 'showProducts'
            }
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
            let start = moment(date).format('L');
            if(date === "") {
                start = 'Toute Date'
            }
            return start
        },
        checkEndDate(date) {
            let end = moment(date).format('L');
            if(date === "") {
                end = "Aujourd'hui"
            }
            return end
        }
    },
    created: function () {
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
            } else {
            this.$router.push('/')
            }
        })
        this.$store.dispatch('getStores')
        this.$store.dispatch('getSuppliers')
        this.$store.dispatch('getProducts')
    },
}
</script>

<style scoped>
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
.search-box{
    width: 100%;
    margin: auto;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
.date-input{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    font-size: 0.9em;
    height: 20px;
    border-radius: 8px;
    border: none;
    padding: 4px 10px;
}
.date-input::-webkit-calendar-picker-indicator{
    background-color: transparent;
    cursor: pointer;
}
.page-resume{
    width: 100%;
    max-width: 700px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.page-resume p{
    margin-left: 10px;
    margin-right: 10px;
}
.item-search{
    margin: 5px 5px;
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
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}
.result-products{
    width: 90%;
}
.error{
    margin-top: 20px;
}
</style>
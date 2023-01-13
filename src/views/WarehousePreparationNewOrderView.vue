<template>
    <div class="error-qty-back" v-if="error">
        <div class="error-qty">
            <p>{{ error }}</p>
            <img class="close-window" @click="error = ''" src="../assets/close.svg" alt="">
        </div>
    </div>
    <ConfirmOrder v-if="this.$store.state.modeConfirmOrder === 'confirmOrder' && this.error === ''" :order="this.getOrder" />
    <Header :title="'Nouvelle Commande'"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation_new_orders" class="back-button">Retour</router-link>
        <div class="cart-button" @click="confirmOrder()">Valider la commande</div>
    </div>

    <div class="page">
        <div class="page-order-infos">
            <div @click="getPurchase()" class="print-order"><img src="../assets/download.svg" class="download">Bon de Commande</div>
            <p>Commande N° : <span class="bold">{{getOrder.id}}</span></p>
            <p>Du : <span class="bold">{{moment(getOrder.createdAt).format('L')}}</span></p>
            <p>Point de vente : <span class="bold">{{getStore.name}}</span></p>
            <p>Mode de livraison : <span class="bold">{{getOrder.delivery}}</span></p>
            <p>Demandeur : <span class="bold">{{getOrder.applicant}}</span></p>
            <p v-if="getOrder.commentStore">Note à la commande : {{getOrder.commentStore}}</p>
        </div>
        
        <Product v-for="detail in getOrder.orderDetails" :key="detail.id" :detail="detail.id" :id="detail.productId" :quantity="detail.quantity" />
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import Product from '@/components/WarehousePreparationNewOrderProduct.vue'
import ConfirmOrder from '@/components/WarehousePreparationNewOrderConfirm.vue'
import { mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
    name: 'warehouse_preparation_new_order',
    components: {
        Header,
        Footer,
        Product,
        ConfirmOrder,
    },
    data() {
        return {
            error: "",
            moment: moment,
            epicerie: [],
            frais: [],
            alcools: [],
            soft: [],
            linge: [],
            emballage: [],
            entretien: [],
            petitsMatériels: [],
            autre: [],
        }
    },
    computed: {
      ...mapGetters(['getOrder', 'getStore', 'getProducts', 'getProductsInOrder'])
    },
    methods: {
        resetCategories() {
            this.epicerie = [];
            this.epicerie.push([{text: 'Epicerie', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
            this.frais = [];
            this.frais.push([{text: 'Frais', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
            this.alcools = [];
            this.alcools.push([{text: 'Alcools', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
            this.soft = [];
            this.soft.push([{text: 'Soft', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
            this.linge = [];
            this.linge.push([{text: 'Linge', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
            this.emballage = [];
            this.emballage.push([{text: 'Emballage', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
            this.entretien = [];
            this.entretien.push([{text: 'Entretien', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
            this.petitsMatériels = [];
            this.petitsMatériels.push([{text: 'Petits Matériels', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
            this.autre = [];
            this.autre.push([{text: 'Autres', colSpan: 3, alignment: 'center', fontSize: 10, fillColor: '#9E8A16', color: 'white', bold: true}, {}, {}])
        },
        checkQtyProduct(productId) {
            let quantity = 0;
            const index = this.getOrder.orderDetails.findIndex(d => d.productId === productId)
            if(index !== -1) {
                quantity = this.getOrder.orderDetails[index].quantity
            }
            return quantity
        },
        checkColor(productId) {
            let quantity = 0;
            let color = '';
            const index = this.getOrder.orderDetails.findIndex(d => d.productId === productId)
            if(index !== -1) {
                quantity = this.getOrder.orderDetails[index].quantity
            }
            if(quantity !== 0) {
                color = '#e8eb4e'
            } else {
                color = 'white'
            }
            return color
        },
        fillProducts(product) {
            switch (product.category) {
                case 'epicerie' :
                    this.epicerie.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
                case 'frais' :
                    this.frais.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
                case 'alcool' :
                    this.alcools.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
                case 'soft' :
                    this.soft.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
                case 'linge' :
                    this.linge.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
                case 'emballage' :
                    this.emballage.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
                case 'entretien' :
                    this.entretien.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
                case 'materiel' :
                    this.petitsMatériels.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
                case 'autre' :
                    this.autre.push([{text : product.name, fontSize: 9, alignment: 'center'}, {text: this.checkQtyProduct(product.id), fontSize: 9, alignment: 'center', fillColor: this.checkColor(product.id)} , {text: product.packaging + ' / colis', fontSize: 9, alignment: 'center'}])
                    break
            }
        },
        downloadPDF() {
            var data = {
                pageMargins: [15, 5, 10, 5],
                content: [
                    {text: 'Commande du : ' + moment(this.getOrder.createdAt).format('L'), fontSize: 15, bold: true},
                    {text: this.getStore.name, fontSize: 15, bold: true},
                    {text: 'Demandeur : ' + this.getOrder.applicant},
                    {text: 'Commentaires : ' + this.getOrder.commentStore, margin: [0, 0, 0, 5]},
                    {
                        columns: [
                            [
                                {
                                    margin: [0, 0, 0, 5],
                                    table: {
                                        margin: [0, 0, 0, 5],
                                        heights: 8,
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.epicerie
                                    },
                                },
                                {
                                    margin: [0, 0, 0, 5],
                                    table: {
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.frais
                                    },
                                },
                                {
                                    margin: [0, 0, 0, 5],
                                    table: {
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.alcools
                                    },
                                },
                                {
                                    margin: [0, 0, 0, 5],
                                    table: {
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.soft
                                    },
                                },
                            ],
                            [
                                {
                                    margin: [0, -60, 0, 5],
                                    table: {
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.emballage
                                    },
                                },
                                {
                                    margin: [0, 0, 0, 5],
                                    table: {
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.linge
                                    },
                                },
                                {
                                    margin: [0, 0, 0, 5],
                                    table: {
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.entretien
                                    },
                                },
                                {
                                    margin: [0, 0, 0, 5],
                                    table: {
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.petitsMatériels
                                    },
                                },
                                {
                                    margin: [0, 0, 0, 5],
                                    table: {
                                        widths: [155, 30, 60],
                                        headerRows: 1,
                                        body: this.autre
                                    },
                                },
                            ]
                        ]
                    },  
                ]
            }
            pdfMake.createPdf(data).download();

        },
        getPurchase() {
            this.$store.dispatch('getProducts')
            .then((res) => {
                this.resetCategories();
                res.data.forEach(product => {
                    this.fillProducts(product)
                })
            })
            .then(() => {
                this.downloadPDF()
            })
        },
        confirmOrder() {
            this.getProductsInOrder.forEach(product => {
                if(product.quantity > product.stock) {
                    this.error = "Impossible de valider la commande, certaines quantités demandées sont supérieures aux stocks disponibles, veuillez ajuster les quantités correspondantes"
                }
            })
            if(this.error === '') {
                console.log('pas d erreur')
                this.$store.state.modeConfirmOrder = "confirmOrder"
            } else {
                console.log('erreur')
            }
        }
    },
    created: function () {
        this.$store.dispatch('getOrder', this.$route.params.id)
        this.$store.dispatch('getProducts')
        .then((res) => {
            this.resetCategories();
            res.data.forEach(product => {
                this.fillProducts(product)
            })
        })
        this.$store.dispatch('checkStocks', this.$route.params.id)
        this.$store.state.modeConfirmOrder = ''
        this.$store.state.modeEditProductQuantity = ''
    },
}
</script>

<style scoped>
.page{
    flex-direction: column;
}
.print-order{
    margin: auto;
    width: 190px;
    background-image: linear-gradient(52deg, rgb(95, 148, 190),rgb(19, 108, 243));
    padding: 7px 5px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.download{
    width: 20px;
    margin-right: 10px;
}
.page-order-infos{
    width: 80%;
    max-width: 600px;
    margin-bottom: 30px;
}
.error-qty-back{
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.error-qty{
    position: relative;
    width: 80%;
    height: 30%;
    max-width: 400px;
    max-height: 250px;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
.error-qty p{
    width: 90%;
    text-align: center;
    color: #ea510b;
}
.close-window{
    position: absolute;
    top: 8px;
    right: 15px;
    width: 20px;
    cursor: pointer;
}
</style>
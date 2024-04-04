<template>
<div class="back-purchase">
    <div class="purchase">
        <div class="buttons-row">
            <div @click="cancelPurchase()" class="back-button-dl">Retour</div>
            <div @click="dl()" class="button-dl">Télécharger</div>
        </div>
        <div id="print">
            <div class="purchase-infos-box">
                <div class="purchase-infos-row">
                    <p class="purchase-infos-order">Commande <span class="bold">{{order.id}}</span> du : <span class="bold">{{moment(order.createdAt).format('L')}}</span></p>
                    <p class="purchase-infos-store bold">{{store}}</p>
                </div>
                <p class="purchase-infos-applicant">Demandeur : <span class="bold">{{order.applicant}}</span></p>
                <p class="purchase-infos-message">Commentaire : {{order.commentStore}}</p>
            </div>
            <div class="purchase-table-box">
                <div class="purchase-table" v-for="category in purchase" :key="category.id">
                    <div class="table-category">{{category.category}}</div>
                    <div class="table-product" v-for="product in category.products" :key="product.id">
                        <div class="table-product-name">{{product.name}}</div>
                        <div class="table-product-qty">{{product.qty}}</div>
                        <div class="table-product-packaging">{{product.packaging}} / colis</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import html2pdf from "html2pdf.js";
import instance from '@/axios';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'Purchase-order',
    props: ['order', 'store'],
    data() {
        return {
            purchase: [],
            moment: moment,
        }
    },
    methods: {
        cancelPurchase() {
            this.$store.commit('RESET_MODE_PURCHASE')
        },
        dl() {
            var element = document.getElementById('print');
            var opt = {
                margin: 0,
                filename: 'BDC.pdf',
                jsPDF: { putOnlyUsedFonts: true }
            };
            html2pdf().from(element).set(opt).save()
        }
    },
    created: function () {
        instance.get(`/orderdetails/purchase/${this.$route.params.id}`)
        .then((res) => {
            this.purchase = res.data
        })
    }
}
</script>

<style scoped>
.back-purchase{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.purchase{
    position: absolute;
    top: 5%;
    background-color: white;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
}
.buttons-row{
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
}
.back-button-dl{
    background-color: #ea510b;
    padding: 5px 20px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
}
.button-dl{
    background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
    padding: 5px 20px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
}
#print{
    width: 100%;
    max-width: 21cm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.purchase-infos-box{
    width: 97%;
    margin-bottom: 10px;
    margin-top: 10px;
}
.purchase-infos-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.purchase-infos-store{
    font-size: 1.3em;
}
.purchase-infos-message{
    text-align: justify;
}
.purchase-table-box{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
}
.purchase-table{
    width: 10cm;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 5px;
}
.table-category{
    width: 100%;
    background-color: #9E8A16;
    border: solid 2px #9E8A16;
    color: white;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
}
.table-product{
    width: 100%;
    display: flex;
    border-right: solid 2px #9E8A16;
    border-bottom: solid 2px #9E8A16;
    border-left: solid 2px #9E8A16;
}
.table-product-name{
    width: 55%;
    background-color: white;
    text-align: center;
    border-right: solid 1px #9E8A16;
}
.table-product-qty{
    width: 10%;
    background-color: #e6c821;
    text-align: center;
    border-left: solid 1px #9E8A16;
    border-right: solid 1px #9E8A16;
    font-weight: 600;
}
.table-product-packaging{
    width: 35%;
    background-color: white;
    border-left: solid 1px #9E8A16;
    text-align: center;
}
</style>
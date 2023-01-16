<template>
    <div :id="this.id" class="prepa-product-order">
        <div class="product-order-infos">
            <div v-if="product !== null" class="product-order-name">
                <p class="bold">{{this.product.name}}</p>
                <p>Référence : {{this.product.reference}}</p>
                <p>Format : {{this.product.size}}</p>
                <div class="stock-txt">Stock dispo : <div class="stk">{{this.stock}}</div></div>
            </div>
            <div v-if="product === null" class="product-order-name">
                <p>Ce produit n'existe plus</p>
            </div>
            <div class="product-order-stock">
                <div class="qty-txt">Qté. <div class="qty">{{this.quantity}} </div></div>
                <div class="req-txt"><span class="req">{{this.request}}</span>commandé(s)</div>
                <button v-if="this.$store.state.modeEditProductQuantity != 'edit'" class="product-order-edit-button" @click="setModeEdit(this.detail)">Modifier la quantité</button>
            </div>
        </div>
        <EditQuantity v-if="this.$store.state.modeEditProductQuantity === 'edit' && this.$store.state.detailId === this.detail" :id="this.detail" :stock="this.stock"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';
import EditQuantity from '@/components/WarehousePreparationNewOrderEditQuantity.vue'

export default {
    name: 'Warehouse-preparation-new-order-product',
    props: ["id", "quantity", "detail", "request"],
    components: {
      EditQuantity,
    },
    data() {
        return {
            error: "",
            stock: 0,
            product: "",
        }
    },
    computed: {
        ...mapGetters(['getProduct'])
    },
    methods: {
        setModeEdit(detail) {
            this.$store.state.detailId = detail
            this.$store.state.modeEditProductQuantity = 'edit'
        },
        checkErrorStock() {
            if(this.stock < this.quantity) {
                document.getElementById(this.id).classList.add('errorStock')
            } else {
                document.getElementById(this.id).classList.remove('errorStock')
            }
        }
    },
    created() {
        this.$store.dispatch('getProfile')
        instance.get(`/product/${this.id}`)
        .then((res) => {
            this.product = res.data
            if(res.data !== null) {
                res.data.stocks.forEach(stock => {
                    this.stock += stock.quantity
                })
            }
        })
        .then(() => {
            this.checkErrorStock()
        })
    },
    updated() {
        this.checkErrorStock()
    }
}
</script>

<style>
.errorStock{
    border: solid 3px #ea510b;
}
.prepa-product-order{
    width: 80%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    box-shadow: rgba(93, 50, 50, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 10px;
    border-radius: 5px;
}
.product-order-infos{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.product-order-name{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.product-order-stock{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: green;
}
.stock-txt{
    display: flex;
    align-items: center;
}
.stk{
    font-size: 1.3em;
    font-weight: 600;
    margin-left: 5px;
}
.req{
    font-size: 1.2em;
    font-weight: bold;
    margin-right: 5px;
}
.qty-txt{
  display: flex;
  align-items: center;
}
.qty{
  font-size: 2em;
  font-weight: 600;
  margin-left: 5px;
}
.product-order-edit-button{
    border: none;
    width: 130px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
    height: 25px;
    border-radius: 10px;
    margin-top: 10px;
}
</style>
<template>
    <div :id="id" class="prepa-product-order">
        <div v-if="isLoading" id="spinner" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
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
                <div class="qty-txt">Qté. <div v-if="errorStock === 'no'" class="qty">{{this.quantity}}</div><div v-if="errorStock === 'yes'" class="qty stock-error">{{this.quantity}}</div></div>
                <div class="req-txt"><span v-if="errorStock === 'no'" class="req">{{this.request}}</span><span v-if="errorStock === 'yes'" class="req stock-error">{{this.request}}</span>commandé(s)</div>
                <div class="product-order-buttons-box">
                    <button v-if="this.$store.state.modeEditProductQuantity != 'edit'" class="product-order-edit-button" @click="setModeEdit(this.detail)">Modifier la quantité</button>
                    <button v-if="this.quantity !== 0" @click="pullProduct(this.detail)" class="product-order-pull-button">Retirer</button>
                </div>
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
            errorStock: "no",
            isLoading: false,
        }
    },
    computed: {
        ...mapGetters(['getProduct'])
    },
    methods: {
        pullProduct(detail) {
            instance.put(`/orderdetails/${detail}`, {
                quantity: 0
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$store.dispatch('getOrder', this.$route.params.id)
                    this.$store.dispatch('checkStocks', this.$route.params.id)
                }
            })
        },
        setModeEdit(detail) {
            this.$store.state.detailId = detail
            this.$store.state.modeEditProductQuantity = 'edit'
        },
        checkErrorStock() {
            if(this.stock < this.quantity) {
                this.errorStock = 'yes'
            } else {
                this.errorStock = 'no'
            }
        }
    },
    created() {
        this.isLoading = true;
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
            this.isLoading = false;
        })
    },
    updated() {
        this.checkErrorStock()
    }
}
</script>

<style>
.stock-error{
    color: #ea510b;
}
.prepa-product-order{
    position: relative;
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
.product-order-pull-button{
    border: none;
    width: 70px;
    cursor: pointer;
    color: white;
    background: rgb(247, 18, 18);
    height: 25px;
    border-radius: 10px;
    margin-top: 10px;
    margin-left: 10px;
}
</style>

<style scoped>
.lds-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background: rgba(168, 168, 168, 0.37);
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 5px;
  border: 4px solid #c90200;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #c90200 transparent transparent transparent;
  z-index: 2;
}
@media (max-width: 600px) {
    .product-order-infos{
        flex-direction: column;
        align-items: flex-start;
    }
    .product-order-stock{
        align-self: flex-end;
    }
}
</style>
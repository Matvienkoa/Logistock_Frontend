<template>
    <div class="prepa-product-order">
        <div class="product-order-infos">
            <div class="product-order-name">
                <p>{{this.product.name}}</p>
                <p>Référence : {{this.product.reference}}</p>
                <p>Format : {{this.product.size}}</p>
                <div class="stock-txt">Stock dispo : <div class="stk">{{this.stock}}</div></div>
            </div>
            <div class="product-order-stock">
                
                <div class="qty-txt">Qté. Demandée : <div class="qty">{{this.quantity}}</div></div>
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
    props: ["id", "quantity", "detail"],
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
        }
    },
    created() {
        this.$store.dispatch('getProfile')
        instance.get(`/product/${this.id}`)
        .then((res) => {
            this.product = res.data
            res.data.stocks.forEach(stock => {
                this.stock += stock.quantity
            })
        })
    }
}
</script>

<style>
.prepa-product-order{
    width: 80%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
    font-size: 1.5em;
    font-weight: 600;
    margin-left: 5px;
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
<template>
    <div class="add-product-order-back">
        <div class="add-product-order">
            <div class="add-product-order-box">
                <p class="add-product-order-title">Sélectionner un produit</p>
                <select @change="setUpInfos(product)" v-model="product" class="search-product-select" name="" id="search-product-select">
                    <option v-for="product in filteredProducts" :key="product.id" :value="product.id">
                        {{product.name}}, {{product.size}}, {{product.packaging}} unité(s)
                    </option>
                </select>
                <div v-if="product" class="add-product-infos-box">
                    <div v-if="productInfos.image" class="add-product-img-box">
                        <img crossorigin="anonymous" :src="productInfos.image" alt="" class="add-product-img">
                    </div>
                    <div class="add-product-infos">
                        <h2>{{productInfos.name}}</h2>
                        <div class="add-product-info-box">
                            <p>Réf. <span class="bold">{{productInfos.reference}}</span></p>
                        </div>
                        <div class="add-product-info-box">
                            <p>Format : <span class="bold">{{productInfos.size}}</span></p>
                        </div>
                        <div class="add-product-info-box">
                            <p>Colisage : <span class="bold">{{productInfos.packaging}} unité(s)</span></p>
                        </div>
                        <div class="add-product-info-box">
                            <p>Stock : <span class="bold">{{stock}}</span></p>
                        </div>
                    </div>
                    <div class="add-product-quantity-box">
                        <p class="">Quantité : </p>
                        <input @input="cancelError" v-model="quantity" type="number" name="" min="1" id="quantity-product-input">
                    </div>
                </div>
                <div class="error" v-if="error">{{ error.message }}</div>
                <div v-if="product" class="confirm-order-buttons">
                    <button class="confirm-order-button" @click="addProduct()">Ajouter</button>
                    <button class="cancel-order-button" @click="backToOrder()">Retour</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'warehouse_preparation_new_order_add_product',
    props: [""],
    data() {
        return {
            allProducts: [],
            orderProducts: [],
            product: null,
            productInfos: "",
            quantity: 1,
            error: "",
            stock: 0
        }
    },
    computed: {
        ...mapGetters(['getProfile', 'getProducts', 'getOrder']),
        filteredProducts() {
            return this.allProducts.filter(product => !this.orderProducts.includes(product.id));
        },
    },
    methods: {
        backToOrder() {
            this.$store.state.modeAddProductToOrder = false
        },
        setUpInfos(id) {
            this.stock = 0;
            const filteredProducts = this.allProducts.filter(product => product.id === id);
            this.productInfos = filteredProducts.length > 0 ? filteredProducts[0] : null;
            filteredProducts[0].stocks.forEach(stock => {
                this.stock += stock.quantity
            })
        },
        addProduct() {
            instance.post(`/orderdetails/`, {
                productId: this.product,
                orderId: this.$route.params.id,
                quantity: this.quantity,
                requestQuantity: 0,
                stock: this.stock
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$store.dispatch('getOrder', this.$route.params.id)
                    this.$store.dispatch('checkStocks', this.$route.params.id)
                    this.$store.state.modeAddProductToOrder = false
                }
            })
            .catch((error) => {
                this.error = error.response.data;
                const quantityInput = document.getElementById('quantity-product-input');
                quantityInput.classList.add('empty')
            })
        },
        cancelError() {
            this.error = ""
            const quantityInput = document.getElementById('quantity-product-input');
            quantityInput.classList.remove('empty')
        }
    },
    created() {
        this.$store.dispatch('getProfile')
        this.$store.dispatch('getProducts')
        .then((res) => {
            this.allProducts = res.data
        })
        this.$store.dispatch('getOrder', this.$route.params.id)
        .then((res) => {
            res.data.orderDetails.forEach(detail => {
                this.orderProducts.push(detail.productId)
            });
        })
    }
}
</script>

<style scoped>
.add-product-order-back{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-product-order{
    position: absolute;
    width: 90%;
    min-height: 50%;
    max-width: 600px;
    max-height: 90%;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 30px 0;
}
.add-product-order-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.add-product-order-title{
    margin: auto;
    margin-bottom: 10px;
    font-size: 1.8em;
    width: 95%;
}
.search-product-select{
  width: 250px;
  max-width: 250px;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 0.9em;
  background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
  margin-bottom: 15px;
}
.search-product-select:focus{
  outline: none;
}
.search-product-select option{
  color: #000;
}
.add-product-infos-box{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.add-product-img-box{
    width: 200px;
    height: 150px;
    margin-bottom: 10px;
}
.add-product-img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.add-product-infos h2{
    margin-bottom: 10px;
}
.add-product-info-box{
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start;
}

.add-product-quantity-box{
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
#quantity-product-input{
    width: 80px;
    margin-left: 10px;
}

.confirm-cart-buttons{
    margin-top: 10px;
}
.confirm-order-buttons{
    margin-top: 20px;
}
.confirm-order-button{
    margin-right: 10px;
    border: none;
    width: 100px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
    height: 30px;
    border-radius: 10px;
}
.cancel-order-button{
    margin-left: 10px;
    border: none;
    width: 130px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
    height: 30px;
    border-radius: 10px;
}
</style>
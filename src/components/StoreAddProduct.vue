<template>
    <div class="add-product-back">
        <div class="add-product">
            <div class="add-product-box">
                <p class="add-product-title">{{ getProduct.name }}</p>
                <div class="add-product-input">
                    <label for="">Quantité : </label>
                    <input v-model="quantity" type="number" name="" id="">
                </div>
                <div class="error" v-if="error">{{ error }}</div>
                <button class="add-product-button" @click="addProduct()">Ajouter</button>
            </div>
            <img class="close-window" @click="this.$store.state.modeAddProduct = ''" src="../assets/close.svg" alt="">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Store-add-product',
    props: ["product"],
    data() {
        return {
            quantity: null,
            error: "",
            stock: null
        }
    },
    computed: {
        ...mapGetters(['getProduct'])
    },
    methods: {
        addProduct() {
            if(this.quantity === null || this.quantity <= 0 || this.quantity === "") {
                this.error = "Merci d'ajouter une quantité valide"
            } 
            else {
                if(this.quantity <= this.stock) {
                    let cart = localStorage.getItem('cart')
                    cart = JSON.parse(cart)
                    if(cart != null) {
                        const index = cart.findIndex(
                            p => p.id === this.product)
                        if(index !== -1) {
                            this.error = "ce produit est déjà dans le manier"
                        } else {
                            cart.push({
                                id: this.product,
                                quantity: this.quantity
                            })
                            localStorage.setItem('cart', JSON.stringify(cart))
                            this.$store.dispatch('getCartForIcon')
                            this.$store.state.modeAddProduct = ""
                            
                        }
                    } else {
                        cart = []
                        cart.push({
                            id: this.product,
                            quantity: this.quantity
                        })
                        localStorage.setItem('cart', JSON.stringify(cart))
                        this.$store.dispatch('getCartForIcon')
                        this.$store.state.modeAddProduct = ""
                        
                    } 
                } else {
                    this.error = "Pas assez de stock sur l'entrepôt, veuillez réduire la quantité"
                }
                
            }
        },
    },
    created() {
        this.$store.dispatch('getProfile')
        this.$store.dispatch('getProduct', this.product)
        .then((res) => {
            console.log(res)
            res.data.stocks.forEach(stock => {
                this.stock += stock.quantity
            });
        })
    }
}
</script>

<style scoped>
.add-product-back{
    position: fixed;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-product{
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
.add-product-box{
    text-align: center;
}
.add-product-title{
    margin-bottom: 20px;
    font-size: 2em;
}
.add-product-input{
    display: flex;
    align-items: center;
    justify-content: center;
}
.add-product-input label{
    margin-right: 10px;
}
.add-product-input input{
    width: 100px;
    font-size: 1.3em;
    cursor: pointer;
}
.add-product-button{
    border: none;
    width: 100px;
    margin-top: 20px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(174,174,174),rgb(14,0,0));
    height: 30px;
    border-radius: 10px;
}
.error{
    margin: 20px 10px 0px 10px;
}
.close-window{
    position: absolute;
    top: 8px;
    right: 15px;
    width: 20px;
    cursor: pointer;
}

@media(min-width: 700px) {
    
}

</style>
<template>
    <div id="add-product-back">
        <div id="add-product">
            {{ getProduct.name }}
            <label for="">Quantité</label>
            <input v-model="quantity" type="number" name="" id="">
            <button @click="addProduct()">Ajouter</button>
            <div v-if="error">{{ error }}</div>
            <div @click="this.$store.state.modeAddProduct = ''">X</div>
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
            if(this.quantity === null || this.quantity === 0) {
                this.error = "merci d'ajouter une quantité valable"
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
                            this.$store.state.modeAddProduct = ""
                        }
                    } else {
                        cart = []
                        cart.push({
                            id: this.product,
                            quantity: this.quantity
                        })
                        localStorage.setItem('cart', JSON.stringify(cart))
                        this.$store.state.modeAddProduct = ""
                    } 
                } else {
                    this.error = "Pas assez de stock sur l'entrepôt, veuillez réduire la quantité"
                }
                
            }
        }
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
#add-product-back{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.836);
    display: flex;
    justify-content: center;
    align-items: center;
}
#add-product{
    width: 70%;
    height: 60%;
    background-color: rgb(179, 179, 179);
}
</style>
<template>
    <div class="confirm-cart-back">
        <div class="confirm-cart">
            <div class="confirm-cart-box">
                <p class="confirm-cart-title">Valider la commande?</p>
                <select @change="cancelErrorSelect()" v-model="delivery" name="delivery" id="select-input" class="search-input required">
                    <option value="">Séléctionnez le mode de livraison</option>
                    <option value="livraison">Livraison</option>
                    <option value="retrait">Retrait</option>
                </select><span class="star">*</span>
                <div class="applicant-box">
                    <p class="applicant-label">Demandeur<span class="star">*</span></p>
                    <input @input="cancelErrorApplicant()" v-model="applicant" id="applicant-input" class='applicant-input required' type="text" placeholder="Nom du demandeur">
                </div>
                <div class="comment-box">
                    <p>Ajouter un commentaire :</p>
                    <textarea id="input-comment" v-model="commentStore" cols="30" rows="10" placeholder="500 Caractères maximum" maxlength="500"></textarea>
                </div>
                <div class="error" v-if="error">{{ error.message }}</div>
                <div class="confirm-cart-buttons">
                    <button class="confirm-cart-button" @click="confirmOrder()">Valider</button>
                    <button class="cancel-cart-button" @click="backToCart()">Retour au panier</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import instance from '@/axios';

export default {
    name: 'Store-confirm-cart',
    data() {
        return {
            delivery: "",
            error: "",
            commentStore: "",
            applicant: ""
        }
    },
    computed: {
        ...mapGetters(['getProfile', 'getStore'])
    },
    methods: {
        cancelErrorSelect() {
            const select = document.getElementById('select-input');
            select.classList.remove('empty')
            this.error = ''
        },
        cancelErrorApplicant() {
            const applicant = document.getElementById('applicant-input');
            applicant.classList.remove('empty')
            this.error = ''
        },
        confirmOrder() {
            let cart = localStorage.getItem('cart')
            cart = JSON.parse(cart)
            instance.post(`/order/`, {
                delivery: this.delivery,
                status: 'pending',
                storeId: this.getStore.id,
                commentStore: this.commentStore,
                applicant: this.applicant
            })
            .then((res) => {
                if(res.status === 201) {
                    cart.forEach(product => {
                        instance.post(`/orderdetails/`, {
                            productId: product.id,
                            orderId: res.data.id,
                            quantity: product.quantity,
                            requestQuantity: product.quantity
                        })
                    })
                    localStorage.removeItem('cart')
                    this.$store.commit('RESET_CART')
                    this.$store.state.modeConfirmCart = ""
                    this.$router.push('/store_order_success')
                }
            })
            .catch((error) => {
                this.error = error.response.data;
                const select = document.getElementById('select-input');
                if(select.value === '') {
                    select.classList.add('empty')
                }
                const applicant = document.getElementById('applicant-input');
                if(applicant.value === '') {
                    applicant.classList.add('empty')
                }
            })
        },
        backToCart() {
            this.$store.state.modeConfirmCart = ""
        }
    },
    created() {
        this.$store.dispatch('getProfile')
    }
}
</script>

<style scoped>
.confirm-cart-back{
    position: fixed;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(179, 179, 179, 0.829);
    display: flex;
    justify-content: center;
    align-items: center;
}
.confirm-cart{
    position: relative;
    width: 80%;
    height: 60%;
    max-width: 450px;
    max-height: 400px;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
.confirm-cart-box{
    width: 100%;
    text-align: center;
}
.confirm-cart-title{
    margin: auto;
    margin-bottom: 10px;
    font-size: 1.8em;
    width: 95%;
}
.search-input{
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
.search-input:focus{
  outline: none;
}
.search-input option{
  color: #000;
}
.applicant-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 300px;
    margin: auto;
}
.applicant-input{
    margin-bottom: 20px;
    margin-top: 5px;
    width: 100%;
    border: solid 1px black;
    border-radius: 5px;
    height: 25px;
    padding: 0 8px;
}
.applicant-input:focus{
    outline: none;
}
.comment-box textarea{
    height: 80px;
    width: 80%;
    max-width: 300px;
    resize: none;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding: 5px 8px;
}
.comment-box textarea:focus{
    outline: none;
}
.confirm-cart-buttons{
    margin-top: 10px;
}
.confirm-cart-button{
    margin-right: 10px;
    border: none;
    width: 100px;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
    height: 30px;
    border-radius: 10px;
}
.cancel-cart-button{
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
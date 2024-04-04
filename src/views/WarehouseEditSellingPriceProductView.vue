<template>
<Header :title="'Prix de vente'"/>
  <div class="back-head">
    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_product', params: {id: getProduct.id}}" class="back-button">
        Retour
    </router-link>
  </div>
  <div class="page-form">
    <h1 class='title-edit'>{{getProduct.name}}</h1>
    <p class="label-form">Prix de vente<span class="star">*</span></p>
    <input id="input-price" @input="cancelError()" class="input required" v-model="price" type="number" min="0" placeholder="en €" />
    <div class="error" v-if="error">{{ error.message }}</div>
    <button @click="addSellingPrice()" class="valid-add-button">Actualiser le prix de vente</button>
    <div class="delete-button alone" @click="resetSellingPrice()">Supprimer</div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_edit_selling_price_product',
    components: {
      Header,
      Footer
    },
    data() {
        return {
          price: null,
          error: ""
        }
    },
    computed: {
        ...mapGetters(['getProduct'])
    },
    methods: {
        addSellingPrice() {
            instance.put(`/product/price/${this.$route.params.id}`, {
                sellingPrice: this.price
            })
            .then(res => {
                if(res.status === 200) {
                    this.$router.push(`/warehouse_product/${this.$route.params.id}`)
                }
            })
            .catch((error) => {
                this.error = error.response.data;
                const emptyInput = document.querySelectorAll('.required');
                emptyInput.forEach(input => {
                    if(input.value === "") {
                        input.classList.add('empty')
                    }
                })
            })
        },
        resetSellingPrice() {
            instance.put(`/product/resetPrice/${this.$route.params.id}`)
            .then(res => {
                if(res.status === 200) {
                    this.$router.push(`/warehouse_product/${this.$route.params.id}`)
                }
            })
        },
        cancelError() {
            const emptyInput = document.querySelectorAll('.required');
            emptyInput.forEach(input => {
                if(input.value !== "") {
                    input.classList.remove('empty')
                }
            })
            this.error = ''
        },
    },
    created() {
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
          if(res.data.role === 'warehouse' && res.data.roleNumber !== 'admin') {
            this.$router.push('/warehouse_home')
          }
        } else {
          this.$router.push('/')
        }
      })
      this.$store.dispatch('getProduct', this.$route.params.id)
      .then((res) => {
        if(res.data.sellingPrice !== null) {
            this.price = res.data.sellingPrice/100
        }
      })
  },
}
</script>

<style scoped>
.page-form{
    width: 80%;
    max-width: 600px;
}
.error{
    margin-bottom: 10px;
}
.alone{
    margin-top: 20px;
    font-size: 0.9em;
}
</style>
<template>
<Header :title="'Référence'"/>
  <div class="back-head">
    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_product', params: {id: getProduct.id}}" class="back-button">
        Retour
    </router-link>
  </div>
  <div class="page-form">
    <h1 class='title-edit'>{{getProduct.name}}</h1>
    <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="product-img">
    <img crossorigin="anonymous" v-if="getProduct.image && this.url === ''" :src="getProduct.image" alt="" class="product-img">
    <div class="form">
      <p class="label-form">Image<span class="img-infos">(max: 1 mo, formats: JPG, PNG, WEBP)</span></p>
      <input class="file-input" id="file" @change="onFileSelected" type="file" ref="imageUrl" name="file">
      <p class="label-form">Référence<span class="star">*</span></p>
      <input id="input-ref" class="input required" @input="cancelError()" v-model="reference" type="text" placeholder="Référence Produit" />
      <p class="label-form">Nom<span class="star">*</span></p>
      <input id="input-name" class="input required" @input="cancelError()" v-model="name" type="text" placeholder="Nom du produit" />
      <p class="label-form">Déscription</p>
      <input id="input-desc" class="input" v-model="description" type="text" placeholder="Déscription" />
      <p class="label-form">Catégorie<span class="star">*</span></p>
      <select @change="cancelError()" v-model="category" name="category" id="select-category" class="input required">
        <option v-for="category in getCategories" :key="category.id" :value="category.id">{{category.name}}</option>
      </select>
      <p class="label-form">Colisage<span class="star">*</span></p>
      <input id="input-colisage" @input="cancelError()" class="input required" v-model="colisage" type="number" min="0" placeholder="Nombre d'unité(s) par colis" />
      <p class="label-form">Délai d'appro<span class="star">*</span></p>
      <input id="input-leadtime" @input="cancelError()" class="input required" v-model="leadTime" type="number" min="0" placeholder="Délai d'appro (en Jour)" />
      <p class="label-form">TVA<span class="star">*</span></p>
      <select @change="cancelError()" class="input required" v-model="tva" name="tva" id="select-tva">
        <option value="5,5">5,5 %</option>
        <option value="10">10 %</option>
        <option value="20">20 %</option>
      </select>
      <p class="label-form">Format<span class="star">*</span></p>
      <input id="input-format" @input="cancelError()" class="input required" v-model="format" type="text" placeholder="Format du produit (CL, GR, CM...)" />
      <p class="label-form">Fournisseur<span class="star">*</span></p>
      <select @change="cancelError()" class="input required" v-model="supplier" name="supplier" id="select-supplier">
        <option v-for="supplier in getSuppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
      </select>
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="editProduct()" class="valid-add-button">Modifier le produit</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_edit_product',
    components: {
      Header,
      Footer,
    },
    data() {
        return {
            reference: "",
            name: "",
            description: "",
            category: "",
            colisage: "",
            leadTime: "",
            tva: "",
            format: "",
            supplier: "",
            error: "",
            imageUrl: "",
            url: "",
        }
    },
    computed: {
        ...mapGetters(['getProduct', 'getSuppliers', 'getCategories'])
    },
    methods: {
        cancelError() {
            const emptyInput = document.querySelectorAll('.required');
            emptyInput.forEach(input => {
                if(input.value !== "") {
                    input.classList.remove('empty')
                }
            })
            this.error = ''
        },
        onFileSelected(event) {
          this.imageUrl = event.target.files[0];
          this.url = URL.createObjectURL(event.target.files[0])
        },
        editProduct() {
            const formData = new FormData();
            formData.append('reference', this.reference)
            formData.append('name', this.name)
            formData.append('description', this.description)
            formData.append('categoryId', this.category)
            formData.append('packaging', this.colisage)
            formData.append('leadTime', this.leadTime)
            formData.append('tva', this.tva)
            formData.append('size', this.format)
            formData.append('supplierId', this.supplier)
            formData.append('image', this.imageUrl)
            instance.put(`/product/${this.getProduct.id}`, formData)
            .then((res) => {
                if(res.status === 201) {
                    this.$router.push(`/warehouse_product/${this.$route.params.id}`)
                }
            })
            .catch((error) => {
              if(error.response.status === 500) {
                  this.error = {message: "Le Fichier est trop volumineux (max : 1 mo) ou son format n'est pas accepté (formats acceptés : .jpg, .png, .gif, .webp)"}
              } else {
                this.error = error.response.data;
              }
              const emptyInput = document.querySelectorAll('.required');
              emptyInput.forEach(input => {
                  if(input.value === "") {
                      input.classList.add('empty')
                  }
              })
            })
        }
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
        this.reference = res.data.reference
        this.name = res.data.name
        this.description = res.data.description
        this.category = res.data.categoryId
        this.colisage = res.data.packaging
        this.leadTime = res.data.leadTime
        this.tva = res.data.tva
        this.format = res.data.size
        this.supplier = res.data.supplierId
      })
      this.$store.dispatch('getSuppliers')
      this.$store.dispatch('getCategories')
  },
}
</script>

<style scoped>
/* Page */
.about{
  margin-bottom: 80px;
}
/* Product */
.product-img{
  width: 200px;
  margin-bottom: 30px;
}
/* Errors input */
.error{
  margin-bottom: 10px;
}
</style>
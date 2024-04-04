<template>
<Header :title="'Créer'"/>
  <div class="back-head">
    <router-link to="/warehouse_products" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <p class="label-form">Référence<span class="star">*</span></p>
      <input id="input-ref" class="input required" @input="cancelError()" v-model="reference" type="text" placeholder="Référence du produit" />
      <p class="label-form">Nom<span class="star">*</span></p>
      <input id="input-name" class="input required" @input="cancelError()" v-model="name" type="text" placeholder="Nom du produit" />
      <p class="label-form">Déscription</p>
      <input id="input-desc" class="input" v-model="description" type="text" placeholder="Déscription" />
      <p class="label-form">Catégorie<span class="star">*</span></p>
      <select @change="cancelError()" v-model="categoryId" name="category" id="select-category" class="input required">
        <option v-for="category in getCategories" :key="category.id" :value="category.id">{{category.name}}</option>
      </select>
      <p class="label-form">Image<span class="img-infos">(max: 1 mo, formats: JPG, PNG, WEBP)</span></p>
      <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="image-selected">
      <input class="file-input" id="file" @change="onFileSelected" type="file" ref="imageUrl" name="file">
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
      <p class="label-form">Disponible à la vente<span class="star">*</span></p>
      <select @change="cancelError()" class="input required" v-model="onSale" name="onSale" id="select-on-sale">
        <option value="yes">Oui</option>
        <option value="no">Non</option>
      </select>
      <p class="label-form">Disponible pour<span class="star">*</span></p>
      <VueMultiselect v-model="permissions" :options="options" :multiple="true" :close-on-select="false" :searchable="false" selectedLabel="Sélectionné" deselectLabel="Retirer" selectLabel="Sélectionner" placeholder="Sélectionner les points de vente">
      </VueMultiselect>
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="addProduct()" class="valid-add-button">Créer le produit</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';
import instance from '@/axios';
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'warehouse_add_product',
  components: {
    Header,
    Footer,
    VueMultiselect 
  },
  data() {
      return {
          reference: "",
          name: "",
          description: "",
          categoryId: "",
          colisage: "",
          leadTime: "",
          tva: "",
          format: "",
          supplier: "",
          error: "",
          imageUrl: "",
          url: "",
          onSale: "",
          permissions: [],
          options: []
      }
  },
  computed: {
      ...mapGetters(['getSuppliers', 'getCategories'])
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
      addProduct() {
        const formData = new FormData();
        formData.append('reference', this.reference)
        formData.append('name', this.name)
        formData.append('description', this.description)
        formData.append('categoryId', this.categoryId)
        formData.append('packaging', this.colisage)
        formData.append('leadTime', this.leadTime)
        formData.append('tva', this.tva)
        formData.append('size', this.format)
        formData.append('supplierId', this.supplier)
        formData.append('image', this.imageUrl)
        formData.append('onSale', this.onSale)
        this.$store.dispatch("addProduct", formData)
        .then((res) => {
            if(res.status === 201) {
                this.permissions.forEach(permission => {
                  instance.post('/permission/', {
                    store: permission,
                    productId: res.data.id
                  })
                })
                this.$router.push('/warehouse_products')
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
  created: function () {
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
      this.$store.dispatch('getSuppliers')
      this.$store.dispatch('getCategories')
      this.$store.dispatch('getStores')
      .then((res) => {
        res.data.forEach(store => {
          this.options.push(store.name)
        })
      })
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style>
.image-selected{
  width: 150px;
  margin-bottom: 10px;
}
.img-infos{
  margin-left: 10px;
  font-weight: 300;
  font-size: 0.8em;
}
.file-input{
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
}
</style>

<style scoped>
.error{
  margin-bottom: 10px;
}
.multiselect{
  z-index: 1;
  cursor: pointer;
  margin-bottom: 30px;
  width: 96%;
}
</style>
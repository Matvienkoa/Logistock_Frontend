<template>
<Header :title="'Référence'"/>
  <div class="back-head">
    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_product', params: {id: getProduct.id}}" class="back-button">
        Retour
    </router-link>
  </div>
  <div class="page-form">

    <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="product-img">
    <img crossorigin="anonymous" v-if="getProduct.image && this.url === ''" :src="getProduct.image" alt="" class="product-img">

    <div class="form">
      <label class="label">Image</label>
      <input class="file-input" id="file" @change="onFileSelected" type="file" ref="imageUrl" name="file">
      <label class="label">Référence<span class="star">*</span></label>
      <input class="input required" @input="cancelError()" v-model="reference" type="text" placeholder="Référence Produit" />
      <label class="label">Nom<span class="star">*</span></label>
      <input class="input required" @input="cancelError()" v-model="name" type="text" placeholder="Nom du produit" />
      <label class="label">Déscription</label>
      <input class="input" v-model="description" type="text" placeholder="Déscription" />
      <label class="label">Catégorie<span class="star">*</span></label>
      <select @input="cancelError()" v-model="category" name="category" id="" class="input required">
        <option value="epicerie">Epicerie</option>
        <option value="frais">Frais</option>
        <option value="alcool">Alcool</option>
        <option value="soft">Soft</option>
        <option value="linge">Linge</option>
        <option value="emballage">Emballage</option>
        <option value="entretien">Entretien</option>
        <option value="materiel">Petits Matériels</option>
        <option value="autre">Autre</option>
      </select>
      <label class="label">Colisage<span class="star">*</span></label>
      <input @input="cancelError()" class="input required" v-model="colisage" type="number" placeholder="Nombre d'unité(s) par colis" />
      <label class="label">Délai d'appro<span class="star">*</span></label>
      <input @input="cancelError()" class="input required" v-model="leadTime" type="number" placeholder="Délai d'appro (en Jour)" />
      <label class="label">TVA<span class="star">*</span></label>
      <select @input="cancelError()" class="input required" v-model="tva" name="tva" id="">
        <option value="5,5">5,5 %</option>
        <option value="10">10 %</option>
        <option value="20">20 %</option>
      </select>
      <label class="label">Format<span class="star">*</span></label>
      <input @input="cancelError()" class="input required" v-model="format" type="text" placeholder="Format du produit (CL, GR, CM...)" />
      <label class="label">Fournisseur<span class="star">*</span></label>
      <select @input="cancelError()" class="input required" v-model="supplier" name="supplier" id="">
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
        ...mapGetters(['getProduct', 'getSuppliers'])
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
            formData.append('category', this.category)
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
              this.error = error.response.data;
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
      this.$store.dispatch('getProduct', this.$route.params.id)
      .then((res) => {
        this.reference = res.data.reference
        this.name = res.data.name
        this.description = res.data.description
        this.category = res.data.category
        this.colisage = res.data.packaging
        this.leadTime = res.data.leadTime
        this.tva = res.data.tva
        this.format = res.data.size
        this.supplier = res.data.supplierId
      })
      this.$store.dispatch('getSuppliers')
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
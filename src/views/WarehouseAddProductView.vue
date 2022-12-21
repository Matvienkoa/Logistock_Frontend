<template>
<Header :title="'Références'"/>
  <div class="back-head">
    <router-link to="/warehouse_products" class="back-button">retour</router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <label class="label">Référence</label>
      <input class="input" @input="cancelError()" v-model="reference" type="text" placeholder="Référence Produit" />
      <label class="label">Nom</label>
      <input class="input" @input="cancelError()" v-model="name" type="text" placeholder="Nom du produit" />
      <label class="label">Déscription</label>
      <input class="input" @input="cancelError()" v-model="description" type="text" placeholder="Déscription" />
      <label class="label">Catégorie</label>
      <select @input="cancelError()" v-model="category" name="category" id="" class="input">
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
      <label class="label">Image</label>
      <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="" class="image-selected">
      <input class="file-input" id="file" @change="onFileSelected" type="file" ref="imageUrl" name="file">
      <label class="label">Colisage</label>
      <input class="input" v-model="colisage" type="number" placeholder="Colisage" />
      <label class="label">Délai d'appro</label>
      <input class="input" v-model="leadTime" type="number" placeholder="Délai d'appro (en J)" />
      <label class="label">TVA</label>
      <select @input="cancelError()" class="input" v-model="tva" name="tva" id="">
        <option value="5,5">5,5 %</option>
        <option value="10">10 %</option>
        <option value="20">20 %</option>
      </select>
      <label class="label">Format</label>
      <input class="input" v-model="format" type="text" placeholder="Format" />
      <label class="label">Fournisseur</label>
      <select @input="cancelError()" class="input" v-model="supplier" name="supplier" id="">
        <option v-for="supplier in getSuppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
      </select>
      <label class="label">Disponible à la vente</label>
      <select @input="cancelError()" class="input" v-model="onSale" name="onSale">
        <option value="yes">Oui</option>
        <option value="no">Non</option>
      </select>
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="addProduct()" class="valid-add-button">Ajouter le produit</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_add_product',
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
          onSale: ""
      }
  },
  computed: {
      ...mapGetters(['getSuppliers'])
  },
  methods: {
      cancelError() {
          const emptyInput = document.querySelectorAll('.input');
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
        formData.append('category', this.category)
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
                this.$router.push('/warehouse_products')
            }
        })
        .catch((error) => {
          this.error = error.response.data;
          const emptyInput = document.querySelectorAll('.input');
          emptyInput.forEach(input => {
              if(input.value === "") {
                  input.classList.add('empty')
              }
          })
        })
      }
  },
  created: function () {
      this.$store.dispatch('getSuppliers')
  },
}
</script>

<style>
.image-selected{
  width: 150px;
  margin-bottom: 10px;
}
.file-input{
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
}
</style>
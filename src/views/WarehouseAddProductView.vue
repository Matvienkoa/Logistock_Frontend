<template>
<Header :title="'Références'"/>
  <div class="about">

    <img crossorigin="anonymous" v-if="this.url" :src="this.url" alt="">

    <div class="form-product">
      <label class="label">Référence</label>
      <input class="input" @input="cancelError()" v-model="reference" type="text" placeholder="Référence Produit" />
      <label class="label">Nom</label>
      <input class="input" @input="cancelError()" v-model="name" type="text" placeholder="Nom du produit" />
      <label class="label">Déscription</label>
      <input class="input" @input="cancelError()" v-model="description" type="text" placeholder="Déscription" />
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
      <input id="file" @change="onFileSelected" type="file" ref="imageUrl" name="file">
      <label class="label">Colisage</label>
      <input class="" v-model="colisage" type="number" placeholder="Colisage" />
      <label class="label">Délai d'appro</label>
      <input class="" v-model="leadTime" type="number" placeholder="Délai d'appro (en J)" />
      <select @input="cancelError()" class="input" v-model="tva" name="tva" id="">
        <option value="5,5">5,5 %</option>
        <option value="10">10 %</option>
        <option value="20">20 %</option>
      </select>
      <label class="label">Format</label>
      <input v-model="format" type="text" placeholder="Format" />
      <select @input="cancelError()" class="input" v-model="supplier" name="supplier" id="">
        <option v-for="supplier in getSuppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
      </select>
      <div id="error" v-if="error">{{ error.message }}</div>
      <button @click="addProduct()" id="add-button" type="button">Ajouter le produit</button>
    </div>

    <router-link to="/warehouse_products">
        retour
    </router-link>

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

<style scoped>
/* Errors input */
  .empty{
    border: solid 2px #fa4c67;
  }
  #error{
    color: #fa4c67;
  }
</style>
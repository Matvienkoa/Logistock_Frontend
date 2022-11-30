<template>
<Header :title="'Fournisseur'"/>
  <div class="about">

    <div class="form-product">
      <label class="label">Nom</label>
      <input class="input" id="input-name" @input="cancelError()" v-model="name" type="text" placeholder="nom" />
      <label class="label">Adresse</label>
      <input class="input" v-model="adress" type="text" placeholder="Adresse" />
      <label class="label">Adresse (suite)</label>
      <input class="input" v-model="adress2" type="text" placeholder="Adresse Suite" />
      <label class="label">Code Postal</label>
      <input class="input" v-model="postalCode" type="text" placeholder="Code Postal" />
      <label class="label">Ville</label>
      <input class="input" v-model="city" type="text" placeholder="Ville" />
      <label class="label">Tél.</label>
      <input class="input" v-model="tel" type="text" placeholder="Téléphone" />
      <label class="label">mail</label>
      <input class="input" v-model="mail" type="text" placeholder="Mail" />
      <div id="error" v-if="error">{{ error.message }}</div>
      <button @click="addSupplier()" id="add-button" type="button">Ajouter le fournisseur</button>
    </div>

    <router-link to="/warehouse_suppliers">
        retour
    </router-link>

    

  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'

export default {
    name: 'warehouse_add_supplier',
    components: {
      Header,
      Footer,
    },
    data() {
        return {
            error: "",
            name: "",
            adress: "",
            adress2: "",
            postalCode: "",
            city: "",
            tel: "",
            mail: ""
        }
    },
    methods: {
        cancelError() {
            const nameInput = document.getElementById('input-name');
            nameInput.classList.remove('empty')
            this.error = ''
        },
        addSupplier() {
            this.$store.dispatch("addSupplier", {
                name: this.name,
                adress: this.adress,
                adress2: this.adress2,
                postalCode: this.postalCode,
                city: this.city,
                tel: this.tel,
                mail: this.mail
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$router.push('/warehouse_suppliers')
                }
            })
            .catch((error) => {
                console.log(error)
                this.error = error.response.data;
                const nameInput = document.getElementById('input-name');
                nameInput.classList.add('empty')
            })
        }
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
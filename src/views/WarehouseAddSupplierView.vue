<template>
<Header :title="'Créer'"/>
  <div class="back-head">
    <router-link to="/warehouse_suppliers" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <label class="label">Nom<span class="star">*</span></label>
      <input class="input" id="input-name" @input="cancelError()" v-model="name" type="text" placeholder="Nom du fournisseur" />
      <label class="label">Adresse</label>
      <input class="input" v-model="adress" type="text" placeholder="Adresse" />
      <label class="label">Adresse (suite)</label>
      <input class="input" v-model="adress2" type="text" placeholder="Adresse Suite" />
      <label class="label">Code Postal</label>
      <input class="input" v-model="postalCode" type="text" placeholder="Code Postal" />
      <label class="label">Ville</label>
      <input class="input" v-model="city" type="text" placeholder="Ville" />
      <label class="label">Contact</label>
      <input class="input" v-model="contact" type="text" placeholder="Nom du contact" />
      <label class="label">Tél.</label>
      <input class="input" v-model="tel" type="text" placeholder="Téléphone" />
      <label class="label">Mail</label>
      <input class="input" v-model="mail" type="text" placeholder="Mail" />
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="addSupplier()" class="valid-add-button">Créer le fournisseur</button>
    </div>
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
            mail: "",
            contact: ""
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
                mail: this.mail,
                contact: this.contact
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$router.push('/warehouse_suppliers')
                }
            })
            .catch((error) => {
                this.error = error.response.data;
                const nameInput = document.getElementById('input-name');
                nameInput.classList.add('empty')
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
        } else {
          this.$router.push('/')
        }
      })
    }
}
</script>

<style>
.valid-add-button{
  background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  height: 30px;
}
</style>

<style scoped>
.error{
  margin-bottom: 10px;
}
</style>
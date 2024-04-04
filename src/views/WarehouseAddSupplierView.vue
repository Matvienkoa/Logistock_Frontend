<template>
<Header :title="'Créer'"/>
  <div class="back-head">
    <router-link to="/warehouse_suppliers" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <p class="label-form">Nom<span class="star">*</span></p>
      <input class="input" id="input-name" @input="cancelError()" v-model="name" type="text" placeholder="Nom du fournisseur" />
      <p class="label-form">Numéro de client</p>
      <input class="input" id="input-customer" v-model="number" type="text" placeholder="Numéro de client" />
      <p class="label-form">SIRET</p>
      <input class="input" id="input-siret" v-model="siret" type="text" placeholder="Siret" />
      <p class="label-form">Adresse</p>
      <input class="input" id="input-adress" v-model="adress" type="text" placeholder="Adresse" />
      <p class="label-form">Adresse (suite)</p>
      <input class="input" id="input-adress2" v-model="adress2" type="text" placeholder="Adresse Suite" />
      <p class="label-form">Code Postal</p>
      <input class="input" id="input-pc" v-model="postalCode" type="text" placeholder="Code Postal" />
      <p class="label-form">Ville</p>
      <input class="input" id="input-city" v-model="city" type="text" placeholder="Ville" />
      <p class="label-form">Contact</p>
      <input class="input" id="input-contact" v-model="contact" type="text" placeholder="Nom du contact" />
      <p class="label-form">Tél.</p>
      <input class="input" id="input-tel" v-model="tel" type="text" placeholder="Téléphone" />
      <p class="label-form">Mail</p>
      <input class="input" id="input-mail" v-model="mail" type="text" placeholder="Mail" />
      <p class="label-form">Commentaire</p>
      <input class="input" id="input-comment" v-model="comment" type="text" placeholder="Commentaire" maxlength="300" />
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
            number: "",
            siret: "",
            adress: "",
            adress2: "",
            postalCode: "",
            city: "",
            tel: "",
            mail: "",
            contact: "",
            comment: "",
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
                number : this.number,
                siret: this.siret,
                adress: this.adress,
                adress2: this.adress2,
                postalCode: this.postalCode,
                city: this.city,
                tel: this.tel,
                mail: this.mail,
                contact: this.contact,
                comment: this.comment
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
          if(res.data.role === 'warehouse' && res.data.roleNumber !== 'admin') {
            this.$router.push('/warehouse_home')
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
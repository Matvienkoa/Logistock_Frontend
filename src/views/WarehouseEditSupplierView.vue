<template>
<Header :title="'Fournisseur'"/>
  <div class="back-head">
    <router-link v-if="getSupplier && getSupplier.id" :to="{name: 'warehouse_supplier', params: {id: getSupplier.id}}" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <h1 class='title-edit'>{{getSupplier.name}}</h1>
    <div class="form">
      <p class="label-form">Nom<span class="star">*</span></p>
      <input class="input" id="input-name" @input="cancelError()" v-model="name" type="text" placeholder="Nom du fournisseur" />
      <p class="label-form">Numéro de client</p>
      <input class="input" id="input-number" v-model="number" type="text" placeholder="Numéro de client" />
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
      <p class="label-form">Tél</p>
      <input class="input" id="input-tel" v-model="tel" type="text" placeholder="Téléphone" />
      <p class="label-form">Mail</p>
      <input class="input" id="input-mail" v-model="mail" type="text" placeholder="Mail" />
      <p class="label-form">Commentaire</p>
      <input class="input" id="input-comment" v-model="comment" type="text" placeholder="Commentaire" maxlength="300" />
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="editSupplier()" class="valid-edit-button">Modifier le fournisseur</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_edit_supplier',
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
            comment: ""
        }
    },
    computed: {
        ...mapGetters(['getSupplier'])
    },
    methods: {
        cancelError() {
            const nameInput = document.getElementById('input-name');
            nameInput.classList.remove('empty')
            this.error = ''
        },
        editSupplier() {
            this.$store.dispatch("editSupplier", {
                name: this.name,
                number : this.number,
                siret: this.siret,
                adress: this.adress,
                adress2: this.adress2,
                postalCode: this.postalCode,
                city: this.city,
                tel: this.tel,
                mail: this.mail,
                id: this.getSupplier.id,
                contact: this.contact,
                comment: this.comment
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$router.push(`/warehouse_supplier/${this.$route.params.id}`)
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
      this.$store.dispatch('getSupplier', this.$route.params.id)
      .then((res) => {
        this.name = res.data.name
        this.number = res.data.number
        this.siret = res.data.siret
        this.adress = res.data.adress
        this.adress2 = res.data.adress2
        this.postalCode = res.data.postalCode
        this.city = res.data.city
        this.contact = res.data.contact
        this.tel = res.data.tel
        this.mail = res.data.mail
        this.comment = res.data.comment
      })
  },
}
</script>

<style>
.page-form{
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.title-edit{
  width: 90%;
  margin: auto;
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 20px;
}
.label-form{
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: 600;
  align-self: flex-start;
}
.input{
  width: 96%;
  height: 30px;
  margin-bottom: 20px;
  border-radius: 3px;
  border: none;
  padding-left: 10px;
  background-color: rgb(226, 226, 226);
}
.input:focus{
  outline: none;
}
.valid-edit-button{
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
  margin-bottom: 20px;
}
</style>
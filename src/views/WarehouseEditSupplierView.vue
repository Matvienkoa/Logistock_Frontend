<template>
<Header :title="'Fournisseur'"/>
  <div class="back-head">
    <router-link v-if="getSupplier && getSupplier.id" :to="{name: 'warehouse_supplier', params: {id: getSupplier.id}}" class="back-button">Retour</router-link>
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
      <label class="label">Tél</label>
      <input class="input" v-model="tel" type="text" placeholder="Téléphone" />
      <label class="label">Mail</label>
      <input class="input" v-model="mail" type="text" placeholder="Mail" />
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
            adress: "",
            adress2: "",
            postalCode: "",
            city: "",
            tel: "",
            mail: "",
            contact: ""
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
                adress: this.adress,
                adress2: this.adress2,
                postalCode: this.postalCode,
                city: this.city,
                tel: this.tel,
                mail: this.mail,
                id: this.getSupplier.id,
                contact: this.contact
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
        } else {
          this.$router.push('/')
        }
      })
      this.$store.dispatch('getSupplier', this.$route.params.id)
      .then((res) => {
        this.name = res.data.name
        this.adress = res.data.adress
        this.adress2 = res.data.adress2
        this.postalCode = res.data.postalCode
        this.city = res.data.city
        this.contact = res.data.contact
        this.tel = res.data.tel
        this.mail = res.data.mail
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
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.form{
  width: 85%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
}
.label{
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
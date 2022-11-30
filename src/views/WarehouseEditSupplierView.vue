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
      <button @click="editSupplier()" id="add-button" type="button">Modifier le fournisseur</button>
    </div>

    <router-link v-if="getSupplier && getSupplier.id" :to="{name: 'warehouse_supplier', params: {id: getSupplier.id}}">
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
            mail: ""
        }
    },
    computed: {
        ...mapGetters(['getSupplier'])
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
        editSupplier() {
            this.$store.dispatch("editSupplier", {
                name: this.name,
                adress: this.adress,
                adress2: this.adress2,
                postalCode: this.postalCode,
                city: this.city,
                tel: this.tel,
                mail: this.mail,
                id: this.getSupplier.id
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$router.push(`/warehouse_supplier/${this.$route.params.id}`)
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
    created() {
      this.$store.dispatch('getSupplier', this.$route.params.id)
      .then((res) => {
        this.name = res.data.name
        this.adress = res.data.adress
        this.adress2 = res.data.adress2
        this.postalCode = res.data.postalCode
        this.city = res.data.city
        this.tel = res.data.tel
        this.mail = res.data.mail
      })
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
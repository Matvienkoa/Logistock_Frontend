<template>
<Header :title="'Catégorie'"/>
  <div class="back-head">
    <router-link v-if="getCategory && getCategory.id" :to="{name: 'warehouse_category', params: {id: getCategory.id}}" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <h1 class='title-edit'>{{getCategory.name}}</h1>
    <div class="form">
      <p class="label-form">Nom<span class="star">*</span></p>
      <input class="input" id="input-name" @input="cancelError()" v-model="name" type="text" placeholder="Nom de la catégorie" />
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="editCategory()" class="valid-edit-button">Modifier la catégorie</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_edit_category',
    components: {
      Header,
      Footer,
    },
    data() {
        return {
            error: "",
            name: ""
        }
    },
    computed: {
        ...mapGetters(['getCategory'])
    },
    methods: {
        cancelError() {
            const nameInput = document.getElementById('input-name');
            nameInput.classList.remove('empty')
            this.error = ''
        },
        editCategory() {
            this.$store.dispatch("editCategory", {
                name: this.name,
                id: this.getCategory.id
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$router.push(`/warehouse_category/${this.$route.params.id}`)
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
      this.$store.dispatch('getCategory', this.$route.params.id)
      .then((res) => {
        this.name = res.data.name
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
.form{
  width: 85%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 90px;
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
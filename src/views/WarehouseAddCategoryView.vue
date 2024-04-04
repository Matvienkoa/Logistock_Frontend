<template>
<Header :title="'Créer'"/>
  <div class="back-head">
    <router-link to="/warehouse_categories" class="back-button">Retour</router-link>
  </div>
  <div class="page-form">
    <div class="form">
      <p class="label-form">Nom<span class="star">*</span></p>
      <input class="input" id="input-name" @input="cancelError()" v-model="name" type="text" placeholder="Nom de la catégorie" />
      <div class="error" v-if="error">{{ error.message }}</div>
      <button @click="addCategory()" class="valid-add-button">Créer la catégorie</button>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'

export default {
    name: 'warehouse_add_category',
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
    methods: {
        cancelError() {
            const nameInput = document.getElementById('input-name');
            nameInput.classList.remove('empty')
            this.error = ''
        },
        addCategory() {
            this.$store.dispatch("addCategory", {
                name: this.name
            })
            .then((res) => {
                if(res.status === 201) {
                    this.$router.push('/warehouse_categories')
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
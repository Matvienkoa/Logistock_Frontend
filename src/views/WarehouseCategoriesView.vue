<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Catégories'"/>
  <div class="back-head">
    <router-link to="/warehouse_products" class="back-button">Retour</router-link>
    <router-link to="/warehouse_add_category" class="cart-button">Créer une catégorie</router-link>
  </div>
  <div class="page">
    <router-link v-for="category in getCategories" :key="category.id" :to="{name: 'warehouse_category', params: {id: category.id}}" class="menu-links-list">
      <div class="menu-bloc-list">
        <div class="title-list">{{ category.name }}</div> 
      </div>
    </router-link>
  </div>
  <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_categories',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
        ...mapGetters(['getCategories'])
    },
    created: function () {
      this.isLoading = true;
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
        this.$store.dispatch('getCategories')
        .then(() => {
          this.isLoading = false;
        })
    },
}
</script>

<style scoped>
.menu-links-list{
  max-width: 600px;
}
</style>
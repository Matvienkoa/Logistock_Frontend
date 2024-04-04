<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Point de vente'"/>
  <div class="back-head">
    <router-link to="/warehouse_admin_stores" class="back-button">Retour</router-link>
  </div>
  <div class="page-mono">
    <div class="page-mono-bloc">
      <h1 class="page-mono-title">{{ getStore.name }}</h1>
      <div class="page-mono-infos">
        <p>Numéro : {{getStore.number}}</p>
        <p>{{getStore.adress}}</p>
        <p>{{getStore.adress2}}</p>
        <p>{{getStore.postalCode}}</p>
        <p>{{getStore.city}}</p>
        <p>{{getStore.tel}}</p>
      </div>
    </div>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_admin_store',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          mode: "",
          isLoading: false,
      }
  },
  computed: {
    ...mapGetters(['getStore'])
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
      this.$store.dispatch('getStore', this.$route.params.id)
      .then(() => {
        this.isLoading = false;
      })
  },
}
</script>
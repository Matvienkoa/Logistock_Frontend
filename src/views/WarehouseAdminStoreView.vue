<template>
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
          mode: ""
      }
  },
  computed: {
    ...mapGetters(['getStore'])
  },
  methods: {
    
  },
  created: function () {
      this.$store.dispatch('getStore', this.$route.params.id)
  },
}
</script>
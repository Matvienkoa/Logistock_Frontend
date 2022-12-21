<template>
<Header :title="getStore.name"/>
  <div class="back-head">
    <router-link to="/warehouse_admin_stores" class="back-button">retour</router-link>
  </div>
  <div class="page-mono">
    <div class="page-mono-store">
      <div class="store-infos">
        <h1>{{ getStore.name }}</h1>
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

<style>
.page-mono-store{
  width: 100%;
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.store-infos{
  width: 80%;
}
@media (min-width: 700px) {
  .page-mono-store{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .store-infos{
    width: unset;
  }
}
</style>
<template>
<Header :title="getStore.name"/>
  <div class="about">

    <router-link to="/warehouse_admin_stores">
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
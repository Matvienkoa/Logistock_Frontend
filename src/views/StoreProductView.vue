<template>
<Header :title="'Welcome'"/>
  <div class="about">


    <router-link to="/store_products">
        retour
    </router-link>
    
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterStore.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'store_product',
  components: {
    Header,
    Footer,
  },
  computed: {
      ...mapGetters(['getProduct'])
  },
  created() {
    this.$store.dispatch('getProfile')
    this.$store.dispatch('getProduct', this.$route.params.id)
  }
}
</script>
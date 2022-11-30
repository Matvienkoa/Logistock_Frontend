<template>
<Header :title="'Référence'"/>
  <div class="about">
    <h1>{{ getProduct.name }}</h1>

    <router-link to="/warehouse_products">
        retour
    </router-link>

    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_edit_product', params: {id: getProduct.id}}" class="">
      modifier
    </router-link>

    <div id="delete-button" @click="switchToConfirm()">Supprimer</div>
    <div id="show-confirm" v-if="mode === 'confirm'">
        <p id="confirm-text">Supprimer le produit?</p>
        <div id="choice-box">
            <button id="confirm-button" @click="deleteProduct()">Supprimer</button>
            <div id="cancel-button" @click="cancelConfirm()">Annuler</div>
        </div>
    </div>
    
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_product',
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
        ...mapGetters(['getProduct'])
  },
  methods: {
    switchToConfirm() {
        this.mode = 'confirm'
    },
    cancelConfirm() {
        this.mode = ''
    },
    deleteProduct() {
      instance.delete(`/product/${this.$route.params.id}`)
      .then((res) => {
          if(res.status === 200) {
              this.$router.push(`/warehouse_products`)
          }
      })
    }
  },
  created: function () {
      this.$store.dispatch('getProduct', this.$route.params.id)
  },
}
</script>
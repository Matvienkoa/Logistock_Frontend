<template>
<Header :title="'Fournisseur'"/>
  <div class="about">
    <h1>warehouse supplier {{ getSupplier.name }}</h1>

    <router-link to="/warehouse_suppliers">
        retour
    </router-link>

    <router-link v-if="getSupplier && getSupplier.id" :to="{name: 'warehouse_edit_supplier', params: {id: getSupplier.id}}" class="">
      modifier
    </router-link>

    <div id="delete-button" @click="switchToConfirm()">Supprimer</div>
    <div id="show-confirm" v-if="mode === 'confirm'">
        <p id="confirm-text">Supprimer le fournisseur?</p>
        <div id="choice-box">
            <button id="confirm-button" @click="deleteSupplier()">Supprimer</button>
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
  name: 'warehouse_supplier',
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
        ...mapGetters(['getSupplier'])
  },
  methods: {
    switchToConfirm() {
        this.mode = 'confirm'
    },
    cancelConfirm() {
        this.mode = ''
    },
    deleteSupplier() {
      instance.delete(`/supplier/${this.$route.params.id}`)
      .then((res) => {
          if(res.status === 200) {
              this.$router.push(`/warehouse_suppliers`)
          }
      })
    }
  },
  created: function () {
      this.$store.dispatch('getSupplier', this.$route.params.id)
  },
}
</script>
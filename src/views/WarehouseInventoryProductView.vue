<template>
<Header :title="'Inventaire Produit'"/>
  <div class="about">
    <h1>{{ getProduct.name }}</h1>

    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_inventory_add_stock_product', params: {id: getProduct.id}}">
        ajouter stock
    </router-link>

    <div v-for="stock in getProduct.stocks" :key="stock.id">
        <div>{{ stock.buyingDate }}</div>
        <div>{{ stock.quantity }}</div>
        <div>{{ stock.dluo }}</div>
        <div>{{ stock.buyingPrice }}</div>
        <router-link v-if="stock && stock.id" :to="{name: 'warehouse_inventory_edit_stock_product', params: {id: stock.id}}">Edit</router-link>
        <div @click="setDeleteMode(stock.id)">Supprimer</div>
        <div v-if="mode === 'delete' && this.stock === stock.id">
          <div>Supprimer ce stock?</div>
          <div>
            <div @click="deleteStock(stock.id)">Supprimer</div>
            <div @click="cancelDeleteMode()">Annuler</div>
          </div>

        </div>
    </div>

    <router-link to="/warehouse_inventory">
        retour
    </router-link>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';

export default {
  name: 'warehouse_inventory_product',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
          mode: "",
          stock: ""
      }
  },
  computed: {
        ...mapGetters(['getProduct'])
  },
  methods: {
    setDeleteMode(stock) {
        this.mode = 'delete',
        this.stock = stock
    },
    cancelDeleteMode() {
        this.mode = '',
        this.stock = ''
    },
    deleteStock(stock) {
      instance.delete(`/stock/${stock}`)
      .then((res) => {
        if(res.status === 200) {
              this.$store.dispatch('getProduct', this.$route.params.id)
          }
      })
    }
  },
  created: function () {
      this.$store.dispatch('getProduct', this.$route.params.id)
  },
}
</script>
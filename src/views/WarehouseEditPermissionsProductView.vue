<template>
<Header :title="'Permissions'"/>
  <div class="back-head">
    <router-link v-if="getProduct && getProduct.id" :to="{name: 'warehouse_product', params: {id: getProduct.id}}" class="back-button">
        Retour
    </router-link>
  </div>
  <div class="page-form">
    <h1 class='title-edit'>{{getProduct.name}}</h1>
    <VueMultiselect v-model="permissions" :options="options" :multiple="true" :close-on-select="false" :searchable="false" selectedLabel="Sélectionné" deselectLabel="Retirer" selectLabel="Sélectionner" placeholder="Sélectionner les points de vente">
    </VueMultiselect>
    <button @click="editPermissions()" class="valid-add-button">Modifier les permissions</button>
  </div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import instance from '@/axios';
import { mapGetters } from 'vuex';
import VueMultiselect from 'vue-multiselect'

export default {
    name: 'warehouse_edit_permissions_product',
    components: {
      Header,
      Footer,
      VueMultiselect
    },
    data() {
        return {
          permissions: [],
          options: []
        }
    },
    computed: {
        ...mapGetters(['getProduct', 'getStores'])
    },
    methods: {
        editPermissions() {
          instance.delete(`/permission/product/${this.$route.params.id}`)
          .then(res => {
            if(res.status === 200) {
              this.permissions.forEach(permission => {
                instance.post('/permission/', {
                  store: permission,
                  productId: this.$route.params.id
                })
              })
            }
          })
          .then(() => this.$router.push(`/warehouse_product/${this.$route.params.id}`))
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
      this.$store.dispatch('getStores')
      .then((res) => {
        res.data.forEach(store => {
          this.options.push(store.name)
        })
      })
      this.$store.dispatch('getProduct', this.$route.params.id)
      instance.get(`/permission/${this.$route.params.id}`)
      .then((res) => {
        res.data.forEach(permission => {
          this.permissions.push(permission.storeName)
        })
      })
  },
}
</script>

<style scoped>
.multiselect{
  z-index: 1;
  cursor: pointer;
  margin-bottom: 30px;
  width: 90%;
  max-width: 600px;
}
</style>
<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<Header :title="'Comptes'"/>
    <div class="back-head">
        <router-link to="/warehouse_admin" class="back-button">Retour</router-link>
        <router-link to="/warehouse_admin_add_login" class="cart-button">Créer un compte</router-link>
    </div>
    <div class="page">
        <div v-for="login in getLogins" :key="login.id" class="menu-links-list">
            <div class="menu-bloc-list">
                <div class="menu-login-infos-bloc">
                    <p class="menu-login-infos" v-if="login.role === 'warehouse'">Compte <span class='admin-login'>Admin</span></p>
                    <p class="menu-login-infos" v-if="login.roleNumber === 'admin'">Accès <span class='admin-login'>Admin</span></p>
                    <p class="menu-login-infos" v-if="login.roleNumber === 'prepa'">Accès <span class='prepa-login'>Préparation</span></p>
                    <p class="menu-login-infos" v-if="login.role === 'store'">Compte <span class='store-login'>Point de vente</span></p>
                    <p class="menu-login-infos" v-if="login.role === 'store'">Numéro : {{login.roleNumber}}</p>
                    <p class="menu-login-infos">Login : {{login.login}}</p>
                    <p class="menu-login-infos">Mail : {{login.email}}</p>
                </div>
                <div class="menu-login-icons-bloc">
                    <router-link :to="{name: 'warehouse_admin_login', params: {id: login.id}}">
                        <img src="../assets/edit.svg" alt="" class='edit-icon'>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'warehouse_admin_logins',
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            isLoading: false,
        }
    },
    computed: {
      ...mapGetters(['getLogins'])
    },
    methods: {
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
        this.$store.dispatch('getLogins')
        .then(() => {
            this.isLoading = false;
        })
    },
}
</script>

<style scoped>
.menu-links-list{
    width: 95%;
    max-width: 600px;
}
.menu-bloc-list{
    height: unset;
    padding: 10px 0;
    justify-content: space-between;
}
.menu-login-infos-bloc{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.menu-login-infos{
    margin-left: 10px;
}
.edit-icon{
    width: 20px;
    margin-right: 10px;
}
.admin-login{
    font-weight: 600;
    color: #ea510b;
}
.admin-access{
    font-weight: 600;
    color: rgb(0, 184, 0);
}
.prepa-login{
    font-weight: 600;
    color: #005fad;
}
.store-login{
    font-weight: 600;
    color: rgb(0, 184, 0);
}
</style>
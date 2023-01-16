<template>
    <div id="foot">
        <img src="../assets/pizza-back-3.webp" alt="" id="pizza-back">
        <div id="foot-bloc">
            <router-link to="/warehouse_home" id="icon-home-link">Accueil</router-link>
            <router-link to="/" @click="logOut()" id="icon-logout-link">Déconnexion</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer-warehouse',
    methods: {
      logOut: function() {
          this.$store.commit("LOG_OUT");
      }
  },
}
</script>

<style scoped>
    #foot{
        position: relative;
        width: 100%;
        height: 50px;
        background-color: rgb(24, 24, 24);
        position: fixed;
        bottom: 0;
        z-index: 2;
    }
    #pizza-back{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        opacity: 0.2;
    }
    #foot-bloc{
        width: 100%;
        max-width: 1200px;
        margin: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #icon-logout-link, #icon-home-link{
        margin-left: 10px;
        margin-right: 10px;
        color: white;
        text-decoration: none;
        z-index: 1;
    }
</style>
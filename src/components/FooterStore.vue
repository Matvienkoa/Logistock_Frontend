<template>
    <div id="foot">
        <div id="foot-bloc">
            <router-link to="/store_home" id="icon-home-link">Accueil</router-link>
            <router-link to="/" @click="logOut()" id="icon-logout-link">Déconnexion</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer-store',
    methods: {
      logOut: function() {
          this.$store.commit("LOG_OUT");
      }
  },
}
</script>

<style scoped>
    #foot{
        width: 100%;
        height: 50px;
        background-color: rgb(24, 24, 24);
        position: fixed;
        bottom: 0;
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
    }
</style>
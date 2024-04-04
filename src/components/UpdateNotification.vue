<template>
  <div v-if="updateAvailable" class="update-notification-back">
    <div class="update-notification-box">
        <p class="update-notification-title">Une nouvelle version de l'application a été installée</p>
        <button @click="refreshPage" class="update-notification-button">Rafraîchir</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UpdateNotification',
    data() {
        return {
            updateAvailable: false,
        };
    },
    methods: {
        refreshPage() {
            window.location.reload();
        },
        showUpdateNotification() {
            this.updateAvailable = true;
        },
    },
    created() {
        document.addEventListener('swUpdated', this.showUpdateNotification, { once: true });
    },
    beforeUnmount() {
        document.removeEventListener('swUpdated', this.showUpdateNotification);
    },
};
</script>

<style scoped>
.update-notification-back {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.671);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}
.update-notification-box {
  position: relative;
  width: 95%;
  max-width: 500px;
  min-height: 40%;
  max-height: 50%;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 21;
  border-radius: 10px;
}
.update-notification-title{
    width: 90%;
    margin: auto;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 30px;
    font-size: 2em;
}
.update-notification-button{
  margin: auto;
  min-width: 200px;
  height: 35px;
  border-radius: 30px;
  background: #c90200;
  color: white;
  margin-top: 20px;
  font-size: 1.1em;
  border: solid 2px #c90200;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  margin-bottom: 40px;
}
</style>

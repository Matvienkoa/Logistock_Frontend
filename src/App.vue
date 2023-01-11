<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* font-family: 'Martian Mono', monospace; */
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
.bold{
  font-weight: 600;
}
.star{
  color: #ea510b;
  margin-left: 3px;
  font-weight: bold;
  font-size: 1.2em;
}
select{
  cursor: pointer;
}
/* Back */
.back-head{
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  margin-bottom: 15px;
}
.back-button{
  position: absolute;
  left: 15px;
  top: 15px;
  background-color: #ea510b;
  text-decoration: none;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
}
.cart-button{
  position: absolute;
  right: 15px;
  top: 15px;
  background-image: linear-gradient(52deg, rgb(122, 218, 119),rgb(11, 100, 26));
  text-decoration: none;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
}
.cart-button-icon{
  position: absolute;
  right: 15px;
  top: 15px;
  text-decoration: none;
  cursor: pointer;
  z-index: 1;
}
.cart-button-icon-closed{
  position: absolute;
  right: 15px;
  top: 15px;
  text-decoration: none;
  z-index: 1;
}
.cart-icon{
  height: 28px;
}
/* Page */
.page{
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
/* Links */
.menu-links{
  width: 80%;
  max-width: 300px;
  margin-bottom: 30px;
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.menu-bloc{
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: rgb(233, 233, 233);
}
.img-back{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
.title-card{
  width: 70%;
  height: 35px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.menu-links-list{
  width: 80%;
  max-width: 300px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: #000;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.menu-bloc-list{
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-card-list{
  color: black;
}
/* Add */
.add-head{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
}
.add-button{
  background-color: #0b920b;
  text-decoration: none;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
}
/* No result */
.no-result{
  width: 90%;
  margin: auto;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
/* Error */
.empty{
  border: solid 2px #ea510b!important;
}
.error{
  text-align: center;
  color: #ea510b;
  align-self: center;
  font-weight: 600;
}

/* Responsiv */
@media (min-width: 700px) {
  .page{
    padding-top: 80px;
  }
  .menu-links{
    max-width: 400px;
    margin-bottom: 50px;
  }
  .menu-bloc{
    height: 200px;
  }
  .menu-links-list{
    max-width: 200px;
  }
}
@media (min-width: 900px) {
  .page{
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .menu-links{
    width: 400px;
    margin-bottom: 50px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .menu-bloc{
    height: 200px;
  }
}
</style>

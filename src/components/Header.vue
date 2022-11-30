<template>
    <div id="head">
        <div id="head-visible">
            <img src="../assets/logo-sp-petit.png" alt="" class="logo-sp">
            <img src="../assets/logo-mburger-petit.webp" alt="" class="logo-mb">
            <h1 id="title">{{ title }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header-view',
    props: ["title"],
}
</script>

<style scoped>
    
    #head{
        background-color: rgb(24, 24, 24);
    }
    #head-visible{
        width: 100%;
        max-width: 1200px;
        margin: auto;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
    }
    .logo-sp{
        width: 90px;
        position: absolute;
        left: 10px;
    }
    .logo-mb{
        width: 130px;
        position: absolute;
        left: 120px;
    }
    #title{
        font-size: 1.6em;
        color: white;
        font-weight: 200;
        margin-right: 20px;
    }
</style>
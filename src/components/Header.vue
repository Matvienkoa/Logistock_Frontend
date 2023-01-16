<template>
    <div id="head">
        <div id="head-box">
            <img src="../assets/3.webp" alt="" id="logo">
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
        position: relative;
        width: 100%;
        height: 50px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
    #head-box{
        margin: auto;
        position: relative;
        width: 100%;
        max-width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #logo{
        width: 60px;
        margin-left: 20px;
    }
    #title{
        font-size: 1.4em;
        color: black;
        font-weight: 200;
        margin-right: 20px;
    }
</style>
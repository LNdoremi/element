<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: '黑体','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 36px 78px 78px 78px;
  background-color: #07171c;
  position: fixed;
  top: 0;
  box-sizing: border-box;
}
*{
  margin: 0;
  padding: 0;
}
</style>

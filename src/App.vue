<template>
  <div>
    <div id="banner">
      <h1>{{msg}}</h1>
    </div>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Best Movies'
    }
  }
}
</script>

<style>
h1{
  color: white;
  text-align: left;
  margin-left: 20vw;
  font: bold 48px "Source Code Pro", Monaco, monospace
}
#banner{
  background: url("assets/banner.jpg") no-repeat center;
  background-size: cover;
  width: 100%;
  height: 19.61vw;
  display: flex;
  align-items: center;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

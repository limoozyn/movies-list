<template>
  <div>
    <header>
      <h1>{{msg}}</h1>
    </header>
    <main id="app">
      <router-view/>
    </main>
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

<style scoped>
h1{
  color: white;
  text-align: left;
  margin-left: 20vw;
  font-weight: 800;
  font-size: 48px;
}
header{
  background: url("assets/banner.jpg") no-repeat center;
  background-size: cover;
  width: 100%;
  height: 19.61vw;
  display: flex;
  align-items: center;
}
main {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <ul class="search-results" v-if="movies">
    <li v-for="movie in movies.results" :key="movie.id" >
      <span class="title">{{movie.original_title}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['movies']
}
</script>

<style scoped>
  ul{
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    margin-top: -4px;
    padding-top: 10px;
    padding-left: 0;
  }
  li{
    list-style: none;
  }
  li:not(:first-of-type){
    border-top: 1px dotted #ccc;
  }
</style>

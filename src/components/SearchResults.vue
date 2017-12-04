<template>
  <ul class="search-results" v-if="movies">
    <li v-for="movie in movies" :key="movie.id" >
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
    margin-top: -4px;
    padding-left: 0;
    list-style: none;
  }
  li{
    border: 1px solid #ccc;
    border-top: 1px dotted #ccc;
  }
  li:first-of-type{
    border-top: none;
    padding-top: 10px;
  }
  li:last-of-type{
    border-radius: 0 0 4px 4px;
  }
</style>

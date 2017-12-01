<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <article class="details">
          <figure>
            <img :src="image_base_url + info.poster_path">
            <figcaption class="title">
              <h2>{{info.original_title}}</h2>
              <p>{{info.overview}}</p>
            </figcaption>
          </figure>
        </article>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <p class="minor-info"><b>Vote:</b> {{info.vote_average}}</p>
        <p class="minor-info"><b>Genres:</b> {{genres}}</p>
        <p class="minor-info"><b>Released:</b> {{info.release_date}}</p>
        <p class="minor-info"><b>Produced By:</b> {{producers}}</p>
      </div>
    </div>
    <div class="row">
      <movies-list class="col-sm-12 col-md-6" :title="'Collection'" :movies="collection"></movies-list>
      <movies-list class="col-sm-12 col-md-6" :title="'Recommended'" :movies="recommendations"></movies-list>
    </div>
  </div>
</template>

<script>
import { fillMovies } from './mixins/fillMovies'
export default {
  name: 'MovieDetails',
  data () {
    return {
      info: {},
      url: this.$route.params.id,
      image_base_url: 'https://image.tmdb.org/t/p/w150/',
      genres: '',
      producers: '',
      collection: {},
      recommendations: {}
    }
  },
  props: [],
  computed: {
  },
  created () {
    this.fillFoundMovies('info', this.composeApiUrl({whichType: 'info', id: this.url}))
  },
  mixins: [fillMovies],
  methods: {
    joinManyOptions: function (list) {
      const temp = []
      list.forEach((option) => {
        temp.push(option.name)
      })
      return temp.join(', ')
    }
  },
  watch: {
    info: function (newValue) {
      this.genres = this.joinManyOptions(newValue.genres)
      this.producers = this.joinManyOptions(newValue.production_companies)
      this.fillFoundMovies('collection', this.composeApiUrl({whichType: 'collection', id: newValue.belongs_to_collection.id}))
      this.fillFoundMovies('recommendations', this.composeApiUrl({whichType: 'recommendations', id: this.url}))
    }
  },
  components: {
    'movies-list': () => import('./MoviesList')
  }

}
</script>


<style scoped>
  .details {

  }
  figure{
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: flex-start;
  }
  figcaption{
    flex-grow: 1;
    color: #7f8c8d;
    margin-left: 50px;
    text-align: left;
  }
  @media(max-width: 786px){
    figure {
      flex-direction: column;
    }
    .minor-info{
      margin-left: 60px;
    }
  }
  .minor-info{
    text-align: left;
    color: #7f8c8d;
  }
</style>

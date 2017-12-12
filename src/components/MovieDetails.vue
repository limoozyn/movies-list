<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <article class="details">
          <figure>
            <img :src="movieBannerUrl">
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
      <movies-list class="col-sm-12 col-md-6" :title="'Collection'" :movies="collection.movies" :loading="collection.loading"></movies-list>
      <movies-list class="col-sm-12 col-md-6" :title="'Recommended'" :movies="recommendations.movies" :loading="recommendations.loading"></movies-list>
    </div>
  </div>
</template>

<script>
import { getDataFromAPI, detailsUrl, collectionUrl, recommendationsUrl } from '../helpers/fillDetails'
export default {
  name: 'MovieDetails',
  data () {
    return {
      info: {},
      url: this.$route.params.id,
      image_base_url: 'https://image.tmdb.org/t/p/w150/',
      movieBannerUrl: '',
      genres: '',
      producers: '',
      collection: {},
      collectionId: '',
      recommendations: {}
    }
  },
  created () {
    this.getDetails()
    this.getRecommendations()
  },
  methods: {
    joinManyOptions: function (list) {
      return list.map((option) => option.name).join(', ')
    },
    getDetails: function () {
      getDataFromAPI(detailsUrl(this.url)).then(
        result => { this.info = result })
    },
    getCollection: function () {
      this.collectionLoading = true
      getDataFromAPI(collectionUrl(this.collectionId), 'parts').then(
        result => {
          this.collection = {movies: result, loading: false}
        })
    },
    getRecommendations: function () {
      this.recommendedLoading = true
      getDataFromAPI(recommendationsUrl(this.url), 'results').then(
        result => {
          this.recommendations = {movies: result, loading: false}
        })
    },
    getMovieBanner () {
    }
  },
  computed: {
  },
  watch: {
    info: function (newValue) {
      this.movieBannerUrl = this.image_base_url + this.info.poster_path
      this.genres = this.joinManyOptions(newValue.genres)
      this.producers = this.joinManyOptions(newValue.production_companies)
      newValue.belongs_to_collection && (this.collectionId = newValue.belongs_to_collection.id)
    },
    collectionId: function (newValue) {
      this.getCollection()
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

import qs from 'qs'
export const fillMovies = {
  data () {
    return {
      urlParams: {
        api_key: process.env.API_KEY,
        language: 'en-US',
        page: '1',
        include_adult: 'false'
      },
      baseUrl: 'https://api.themoviedb.org/3/'
    }
  },
  computed: {
    urlParamsString: function () {
      return qs.stringify(this.urlParams)
    },
    popularUrl: function () {
      return `${this.baseUrl}movie/popular?${this.urlParamsString}`
    },
    upcomingUrl: function () {
      return `${this.baseUrl}movie/upcoming?${this.urlParamsString}`
    },
    detailsUrl: function () {
      return `${this.baseUrl}movie/${this.url}?${this.urlParamsString}`
    },
    collectionUrl: function () {
      return `${this.baseUrl}collection/${this.collectionId}?${this.urlParamsString}`
    },
    recommendationsUrl: function () {
      return `${this.baseUrl}movie/${this.url}/recommendations?${this.urlParamsString}`
    },
    fullquery: function () {
      const updUrlParams = Object.assign({query: this.query}, this.urlParams)
      let urlParamsString = qs.stringify(updUrlParams)
      return `${this.baseUrl}search/movie?${urlParamsString}`
    }
  },
  methods: {
    getPromise: function (url) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then((resp) => resp.json())
          .then((data) => {
            resolve(data)
            // TODO: move the stop spinning to the HomePage
            // this.isSpinning = false
          })
      })
    },
    getPopular: function () {
      this.getPromise(this.popularUrl).then(
        result => { this.popular = result.results })
    },
    getUpcoming: function () {
      this.getPromise(this.upcomingUrl).then(
        result => { this.upcoming = result.results })
    },
    getDetails: function () {
      this.getPromise(this.detailsUrl).then(
        result => { this.info = result })
    },
    getCollection: function () {
      this.getPromise(this.collectionUrl).then(
        result => { this.collection = result.parts })
    },
    getRecommendations: function () {
      this.getPromise(this.recommendationsUrl).then(
        result => { this.recommendations = result.results })
    },
    search: function () {
      this.getPromise(this.fullquery).then(
        result => { this.found = result.results })
    }
  }
}

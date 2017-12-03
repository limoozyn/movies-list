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
      baseUrl: 'https://api.themoviedb.org/3/',
      upcomingUrl: '',
      recommendationsUrl: '',
      collectionUrl: ''
    }
  },
  computed: {
    popularUrl: function () {
      const urlParamsString = qs.stringify(this.urlParams)
      return `${this.baseUrl}movie/popular?${urlParamsString}`
    },
    popularPromise: function () {
      return new Promise((resolve, reject) => {
        fetch(this.popularUrl)
          .then((resp) => resp.json())
          .then((data) => {
            resolve(data.results)
            // TODO: move the stop spinning to the HomePage
            // this.isSpinning = false
          })
      })
    }
  },
  methods: {
    fillFoundMovies: function (whichType, url) {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          switch (whichType) {
            case 'popular':
            case 'upcoming':
            case 'recommendations':
              this[whichType] = data.results
              break
            case 'collection':
              this[whichType] = data.parts
              break
            default:
              this[whichType] = data
          }
          this.isSpinning = false
        })
    },
    composeApiUrl: function ({whichType, query = '', id = ''}) {
      const baseUrl = 'https://api.themoviedb.org/3/'
      const urlParams = {
        api_key: process.env.API_KEY,
        language: 'en-US',
        page: '1',
        include_adult: 'false'
      }
      let urlParamsString = ''
      let apiUrl = ''
      switch (whichType) {
        case 'popular':
        case 'upcoming':
          urlParamsString = qs.stringify(urlParams, { addQueryPrefix: true })
          apiUrl = `${baseUrl}movie/${whichType}${urlParamsString}`
          break
        case 'info':
          urlParamsString = qs.stringify(urlParams, { addQueryPrefix: true })
          apiUrl = `${baseUrl}movie/${id}${urlParamsString}`
          break
        case 'collection':
          urlParamsString = qs.stringify(urlParams, { addQueryPrefix: true })
          apiUrl = `${baseUrl}collection/${id}${urlParamsString}`
          break
        case 'recommendations':
          urlParamsString = qs.stringify(urlParams, { addQueryPrefix: true })
          apiUrl = `${baseUrl}movie/${id}/${whichType}${urlParamsString}`
          break
        case 'search':
          const updUrlParams = Object.assign({query}, urlParams)
          urlParamsString = qs.stringify(updUrlParams, { addQueryPrefix: true })
          apiUrl = `${baseUrl}search/movie${urlParamsString}`
          break
      }
      return apiUrl
    }
  }
}

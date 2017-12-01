import qs from 'qs'
export const fillMovies = {
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
        api_key: this.key,
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

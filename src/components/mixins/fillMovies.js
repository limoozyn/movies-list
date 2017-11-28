export const fillMovies = {
  methods: {
    fillFoundMovies: function (whichType, url) {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          this[whichType] = data
          this.isSpinning = false
        })
    }
  }
}

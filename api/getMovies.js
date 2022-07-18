
const apiKey = '58ecd562dcaf5f56b6223733c9e0f113'

async function getMovies({ $axios }) {
  try {
    const { data } = await $axios.get(`/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
    return data?.results || []
  } catch (err) {
    console.log(err, `err`)
  }
}

async function getMoviesByQuery({ $axios }, query) {
  try {
    const { data } = await $axios.get(`/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${query}`)
    return data?.results || []
  } catch (error) {
    console.log(error, 'error')
  }
}

async function getMovieById({ $axios }, id) {
  try {
    const { data } = await $axios.get(`/movie/${id}?api_key=${apiKey}&language=en-US`)
    return data
  } catch (error) {
    console.log(error, 'error')
  }
}

export {
  getMoviesByQuery,
  getMovies,
  getMovieById
}

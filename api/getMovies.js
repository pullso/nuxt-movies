
const apiKey = '58ecd562dcaf5f56b6223733c9e0f113'

export default async function getMovies({ $axios }) {
  try {
    const { data } = await $axios.get(`now_playing?api_key=${apiKey}&language=en-US&page=1`)
    return data?.results || []
  } catch (err) {
    console.log(err, `err`)
  }
}

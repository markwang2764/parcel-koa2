const rp = require('request-promise-native') 
async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await rp(url)
  return res
}
;(async () => {
  let movies =  [
  { doubanId: 25875034,
    title: '舌尖上的中国 第三季',
    rate: 6.7,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2243726052.jpg' },
  { doubanId: 27617334,
    title: '经典咏流传',
    rate: 9.2,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2509104691.jpg' }
  ]
  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    try {
      movieData = JSON.parse(movieData)
      console.log(movieData)
    } catch(err) {
      console.log(err)
    }
  })
})()

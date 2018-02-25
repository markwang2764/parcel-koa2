const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err,ret,info) => {
      if(err) {
        reject(err)
      }else{
        if(info.statusCode === 200) {
          resolve({key})
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  let movies = [
    { video: 'http://vt1.doubanio.com/201802222317/3b46d5e4055ad0097880d9c716e31b17/view/movie/M/302270429.mp4',
    doubanId: '25875034',
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2243726052.jpg',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2513268124.jpg?1518335075' }
  ]
  movies.map(async movie => {
    if(movie.video && !movie.key){
      try {
        console.log('准备上传video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('准备上传cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        console.log('准备上传poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')

        if(videoData.key) {
          movie.videoKey = videoData.key
        }
        if(coverData.key) {
          movie.coverKey = coverData.key
        }
        if(posterData.key) {
          movie.posterKey = posterData.key
        }
        console.log(movie)
      } catch (err) {
        console.log(err)
      }
    }
  })
})()
const puppeteet = require('puppeteer')
const base = `https://movie.douban.com/subject/`
const doubanId = '25875034'
const videoBase = `https://movie.douban.com/trailer/227429`
const sleep = time => new Promise(resolve => {
  setTimeout(resolve,time)
})

;(async () => {
  const browser = await puppeteet.launch({
    executablePath:	'/Applications/Chromium.app/Contents/MacOS/Chromium',
    headless: false,
    dumpio: false
  })
  const page = await browser.newPage()
  await page.goto(base + doubanId,{
    wartUntil: 'networkidle2'
  })
  await sleep(1000)
 
  const result = await page.evaluate(() => {
    var $ = window.$

    var it = $('.related-pic-video')
    console.log(1)
    console.log(it)
    if(it && it.length>0){
      var link = it.attr('href')
      var cover = it.find('img').attr('src')
      return {
        link,cover
      }
    }
    return {}
  })
  console.log(result)
  let video
  if (result.link) {
    console.log(result.link)
    await page.goto(result.link,{
      waitUntil: 'networkidle2'
    })
    console.log(1)
    await sleep(2000)
    console.log(2)
    video = await page.evaluate(() => {
      console.log(window)
      var $ = window.$
      console.log(window.$)
      var it = $('source')
      console.log(it)
      if (it && it.length > 0) {
        return it.attr('src')
      }
      return ''
    })
  }
  const data = {
    video,
    doubanId,
    cover: result.cover
  }
  console.log(video);
  console.log(data)
  browser.close()
  process.send(data)
  process.exit(0)
})()

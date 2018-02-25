
class Boy {
  @speak('中文')
  run(){
    console.log('I can speak'+this.language);
  }
  run2(){
    console.log(3);
  }
}

function speak(language) {
  return function (target,key,descriptor) {
    target.language = language
    console.log(target)
    console.log(key)
    console.log(descriptor)
  }
}
// function speak(target,key,descriptor) {
//   console.log(target)
//   console.log(key)
//   console.log(descriptor)
// }
const Luke = new Boy()

Luke.run()
import {HTTP} from "../util/http.js"
class ClassicModel extends HTTP{
  getLaster(scallBack){
    this.request({
      url: "classic/latest",
      success:(res)=> {
        console.log(res)
        scallBack(res)
      }
    })
  }
}
export { ClassicModel}
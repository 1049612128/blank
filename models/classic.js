import {HTTP} from "../util/http.js"
class ClassicModel extends HTTP{
  getLaster(scallBack){
    this.request({
      url: "classic/latest",
      success:(res)=> {
        console.log(res)
        scallBack(res)
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }
  getClassic(index,nextOrPreviou,scallBack){
    console.log(nextOrPreviou)
    let key = nextOrPreviou=="next"?this._getKey(index+1) : this._getKey(index-1)
    let classic =wx.getStorageSync(key)
    if (classic){
      scallBack(classic)
    }else{
      this.request({
        url: "classic/" + index + "/" + nextOrPreviou,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          scallBack(res)
        }
      })
    }
    
  }
  isFirst(index){
    return index==1?true:false;
  }
  isLaster(index){
    let latestIndex = this._getLatestInde();
    return latestIndex==index?true:false;
  }
  _setLatestIndex(index){
    //小程序写入缓存同步
    wx.setStorageSync("latest", index)
  }
  _getLatestInde(){
    let index = wx.getStorageSync("latest");
    return index
  }
  _getKey(index){
    let key ="classic"+index;
    return key
  }
}
export { ClassicModel}
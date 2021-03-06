import { config } from "../config.js"
const tips = {
  1: "报了一个错",
  1005: "appkey无效",
  1007: "路径有误",
  1000: "路径有误",
  3000: "刊期不存在"
}
class HTTP {
  request({url,data={},method="GET"}){
    return new Promise((resolve,reject)=>{
        this._request(url,resolve,reject,data,method)
    })
  }
  _request(url,resolve,reject,data={},method='GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'conent-type': "appliation/json",
        "appkey": config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith("2")) {
          resolve(res.data)
        } else {
          let error_code = res.data.error_code;
          console.log(error_code)
          this._show_error(error_code)

        }
      },
      fail: (error) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code];
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP}
import { config } from "../config.js"
const tips={
  1:"报了一个错",
  1005:"appkey无效",
  1007:"路径有误",
  1000: "路径有误",
  3000:"刊期不存在"
}
class HTTP{
  request(params){
    if(!params.method){
      params.method="GET";
    }
    wx.request({
      url: config.api_base_url+params.url,
      method:params.method,
      data:params.data,
      header:{
        'conent-type':"appliation/json",
        "appkey": config.appkey
      },
      success:(res)=>{
          let code = res.statusCode.toString();
          if (code.startsWith("2")) {
            params.success&&params.success(res.data)
          } else {
            let error_code = res.data.error_code;
            console.log(error_code)
            this._show_error(error_code)

          }  
      },
      fail: (error)=>{
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    if (!error_code){
      error_code =1;
    }
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2000
    })
  }
}
exports.HTTP = HTTP;
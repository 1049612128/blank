import { HTTP } from "../util/http.js"
class LikeModel extends HTTP{
  like(behavior,artID,category){
    let url=behavior=="like"?"like":"like/cancel"
    this.request({
      url:url,
      method:"POST",
      data:{
        art_id:artID,
        type: category
      }
    })
  }
  getClassicLikeStatus(artId,categroy,sCallback){
    this.request({
      url: 'classic/' + categroy + "/" + artId+'/favor',
      success: sCallback
    })
  }
} 

export { LikeModel}
import { ClassicModel } from "../../models/classic.js"
import { LikeModel } from "../../models/like.js"
let Classic = new ClassicModel();
let like = new LikeModel();
// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Classic.getLaster((res)=>{
      //this._getLikeStatus(res.id, res.type)
       this.setData({
         classData: res,
         likeCount: res.fav_nums,
         likeStatus: res.like_status
       })
    })
     

  },
  onLike: function (ev) {
    let behavior =ev.detail.behavior;
    like.like(behavior, this.data.classData.id,this.data.classData.type)
  },
  onNext:function(e){
    this._onupdata("next")
  },
  _onupdata: function (nextOrPreviou){
    let index = this.data.classData.index;
    Classic.getClassic(index, nextOrPreviou, (res) => {
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classData: res,
        latest: Classic.isLaster(res.index),
        first: Classic.isFirst(res.index)
      })
    })
  },
  onPrevious:function(e){
    this._onupdata("previous")
  },
  _getLikeStatus: function (artId,categroy){
    like.getClassicLikeStatus(artId, categroy,(res)=>{
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
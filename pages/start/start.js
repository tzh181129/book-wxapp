let api = require('../../utils/api.js');
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex:function(e){    
      wx.switchTab({
        url: '/pages/index/index',
      });
  },
      
  onLoad:function(){
    
  
    //  this.setData({
    //    avatar : app.globalData.userInfo.avatarUrl
    //  })


    // wx.checkSession({
    //   success() {
    //     // session_key 未过期，并且在本生命周期一直有效
    //   },
    //   fail() {
    //     // session_key 已经失效，需要重新执行登录流程
    //     wx.navigateTo({
    //       url: '/pages/login/login',

    //     })
    //   }
    // })
  },

  onReady: function(){
    var that = this;
    setTimeout(function(){
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(that.data.angle !== angle){
        that.setData({
          angle: angle
        });
      }
    });
  }
});

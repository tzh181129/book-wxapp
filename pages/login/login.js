let api = require('../../utils/api.js');
//获取应用实例
var app = getApp();

Page({
    data: {
        angle: 0,
    },
    getUserInfo: function (e) {
        console.log('e', e)
        if (!e.detail.userInfo) {
            return;
        } else {
            wx.showToast({
                title: '授权登录中..',
                image: '/img/more/loading.gif',
            })
            var userInfo = e.detail.userInfo
            console.log('用户信息总览', userInfo)
            wx.login({
                success: function (res) {
                    if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: api.login,
                            method: 'GET',
                            data: {
                                userInfo: userInfo,
                                code: res.code,
                                grant_type: 'authorization_code'
                            },
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (res) {
                                console.log(res)
                                if (res.data.code == 1) {
                                  wx.setStorageSync('skey',res.data.skey)
                                    // wx.hideLoading()
                                    wx.showToast({
                                        title: '登录成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    setTimeout(function () {
                                        wx.navigateTo({
                                            url: '/pages/start/start',
                                        })
                                    }, 2000)
                                } else {
                                    wx.showModal({
                                        title: '警告',
                                        content: '登录失败',
                                    })
                                }
                            },
                        })
                    }
                }
            })
        }
    },
    onLoad: function () {
      wx.getSetting({
        success: (res) => {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            wx.navigateTo({
                url: '/pages/start/start',
            })
          }
        }
      })
    },

    onReady: function () {
        var that = this;
        wx.onAccelerometerChange(function (res) {
            var angle = -(res.x * 30).toFixed(1);
            if (angle > 14) {
                angle = 14;
            }
            else if (angle < -14) {
                angle = -14;
            }
            if (that.data.angle !== angle) {
                that.setData({
                    angle: angle
                });
            }
        });
    }
});


import { $digest, $init } from '../../lib/page.data'
import { $login, $request, Session } from '../../lib/page.auth'

const { regeneratorRuntime } = global
//获取应用实例
let api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indColor: '#C7C7C7',
    indColorA: '#ffffff',
    autoplay: true,
    interval: 3000,
    circular: true,
    priceSort: 0,
    color: 'gray',
    newcolor: 'gray',
    stockcolor: 'gray'
  },

  async new() {
    let productlist = await this.getProductList(1);
    this.data.productList = productlist
    this.setData({
      newcolor: 'red'
    })
    this.setData({
      priceSort: 0
    })
    this.setData({
      stockcolor: 'gray'
    })
    this.setData({
      color: 'gray'
    })
    $digest(this)
  },

  async stock() {
    let productlist = await this.getProductList(4);
    this.data.productList = productlist
    this.setData({
      stockcolor: 'red'
    })
    this.setData({
      priceSort: 0
    })
    this.setData({
      color: 'gray'
    })
    this.setData({
      newcolor: 'gray'
    })
    $digest(this)
  },

  async priceSortTap() {
    var priceSort = this.data.priceSort;
    if (priceSort == 0) {
      priceSort = 1;
      let productlist = await this.getProductList(2);
      this.data.productList = productlist
      $digest(this)
    } else if (priceSort == 1) {
      priceSort = 2;
      let productlist = await this.getProductList(3);
      this.data.productList = productlist
      $digest(this)
    } else if (priceSort == 2) {
      priceSort = 1;
      let productlist = await this.getProductList(2);
      this.data.productList = productlist
      $digest(this)
    }
    this.setData({
      priceSort: priceSort
    })
    this.setData({
      stockcolor: 'gray'
    })
    this.setData({
      color: 'gray'
    })
    this.setData({
      newcolor: 'gray'
    })
  },



  async goodsTap(e) {
    console.log(e)
    var product_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/details/details?product_id=' + product_id,
    })
  },

  async urlTap(e) {
    var sellerurl = e.currentTarget.dataset['href']
    wx.navigateTo({
      url: '/pages/common/common?sellerurl=' + sellerurl,
    })
  },

  searchTap: function () {
    wx.navigateTo({
      url: '/pages/indexSearch/indexSearch',
    })
  },

  async toDetailsTap(e) {
    console.log(e)
    var product_id = e.currentTarget.dataset['id']
    wx.navigateTo({
      url: '/pages/details/details?product_id=' + product_id,
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  async addcollection(e) {
    var product_id = e.currentTarget.dataset['product_id']
    const res = await $request({ url: api.user_collection, data: { product_id: product_id }, method: 'POST' })
    console.log(res)
    wx.showModal({
      title: '提示',
      content: res.msg,
    })
    this.onLoad()
  },

  async delcollection(e) {
    var collection_id = e.currentTarget.dataset['collection_id']
    const res = await $request({ url: api.user_delcollection, data: { collection_id: collection_id }, method: 'POST' })
    console.log(res)
    wx.showModal({
      title: '提示',
      content: res.msg,
    })
    this.onLoad()
  },


  async getProductList(type) {

    const res = await $request({ url: api.product_list, data: { type: type } })
    let data = JSON.parse(res.data);
    console.log('商品列表', data)
    return data;
  },

  async onLoad(options) {
    $init(this);
    
    try {
      const session = Session.get();
      console.log('session',session)

      if (session) {
        const login_res = await $request({ url: api.is_login, data: {}, method: 'GET' });
        if (login_res.code) {
          this.data.userInfo = session.userInfo;
        } else {
          Session.clear();
          const userInfo = await $login();
          console.log('userInfo',userInfo)
          this.data.userInfo = userInfo;
        }
        this.data.userInfo = JSON.parse(this.data.userInfo);


        //请求banner图片数据
        const res = await $request({ url: api.recommed })
        let banners = JSON.parse(res.data)
        this.data.banners = banners;
        console.log("banner数据:", banners)
        $digest(this)
      } else {
        try {
          const userInfo = await $login();
          this.data.userInfo = JSON.parse(userInfo);

          const res = await $request({ url: api.recommed })
          let banners = JSON.parse(res.data)
          this.data.banners = banners;
          console.log("banner数据:", banners)
          $digest(this)
        }
        catch (err) {
          console.log("+++1+++ error:", err)
        }
      }
    }
    catch (err) {
      console.log("+++2+++ error:", err)
      wx.showModal({
        title: '错误提示！',
        showCancel: false,
        content: '网络环境出问题了，请换个地方再试一次！',
        success: function (res) {

        },
      })
    }
    $digest(this)
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  onShow: function () {
    this.onLoad()
  },

})

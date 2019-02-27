/*!
 * 接口组件 - api.js
 * @author:wuquanyao
 * @date:2018-03
 */

let

  domain = "http://www.book.com/",
  host = domain + "api/",
  api = {};


// 域名
api.domain = domain;

/**
 * 服务推荐
 * @return string
 */
api.login= host + "common/login";

/**
 * 判断是否登录
 * @return string
 */
api.is_login = host + "common/isLogin";

/**
 * 推荐
 * @return string
 */
api.recommed = host + "novel/recommed";


//暴露接口
module.exports = api;

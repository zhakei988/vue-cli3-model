var path = require('path');

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'web/'
    : '/',
  indexPath: 'play.html',
  //开发环境配置
  lintOnSave: false,//是否启用eslint
  // pages:{
  // //页面文件配置
  
  // },
  devServer: {
    https: true,//开启https服务
    //disableHostCheck: true,//hostname检测，如域名不同则无法访问
    port: 443,
    host: 'testlocalzhibo.hexun.com',
  }
};
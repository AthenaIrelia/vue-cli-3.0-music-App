 const path = require('path')
 const express = require('express')
 const app = express()

 var apiRoutes = express.Router();
 app.use('/api', apiRoutes)
 module.exports = {

   configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
     Object.assign(config, { // 开发生产共同配置
       resolve: {
         alias: {
           '@': path.resolve(__dirname, './src'),
           // '@c': path.resolve(__dirname, './src/components'),
           'common': path.resolve(__dirname, './src/common'),
           'components': path.resolve(__dirname, './src/components'),
           'api': path.resolve(__dirname, './src/api'),
           'base': path.resolve(__dirname, './src/base'),
           'vue$': 'vue/dist/vue.esm.js'
         }
       }
     })
   },
   //tingbuqing
   // chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   //   if (debug) {
   //     // 本地开发配置
   //   } else {
   //     // 生产开发配置
   //   }
   // },
   css: { // 配置高于chainWebpack中关于css loader的配置
     modules: true, // 是否开启支持‘foo.module.css’样式
     extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
     sourceMap: false, // 是否在构建样式地图，false将提高构建速度
     loaderOptions: { // css预设器配置项
       css: {
         localIdentName: '[name]-[hash]',
         camelCase: 'only'
       },
       stylus: {}
     }
   },
   parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
   pluginOptions: { // 第三方插件配置
   },
   pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   },
   devServer: {
     open: true,
     host: '0.0.0.0',
     port: 8080,
     https: false,
     hotOnly: false,
     proxy: {
       '/api': {
         target: '<url>',
         ws: true,
         changOrigin: true
       }
     },
     before(app) {
       var axios = require('axios');
       app.get('/api/getDissList', function (req, res) {
         const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
         axios.get(url, {
           headers: {
             referer: 'https://c.y.qq.com',
             host: 'c.y.qq.com'
           },
           params: req.query
         }).then((response) => {
           res.json(response.data);
         })
         // .catch( (e) => {
         //     console.log(e);
         // }
         // )
       });
       app.get('/api/getSingerList', function (req, res) {
         const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
         axios.get(url, {
           headers: {
             referer: 'https://u.y.qq.com',
             host: 'u.y.qq.com'
           },
           params: req.query
         }).then((response) => {
           res.json(response.data);
         })
         // .catch( (e) => {
         //     console.log(e);
         // }
         // )
       });
     }
   }
 }
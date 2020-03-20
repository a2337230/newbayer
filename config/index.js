'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
let www = "https://www2.xlxt.net/"
let sso = "https://sso2.xlxt.net/";
let view = 'https://exam4.xlxt.net'
let sale = 'https://sale2.xlxt.net/';
let vote = 'https://votenew2.xlxt.net/';
let lms = 'https://www2.xlxt.net/';

// let www = "https://www.xlxt.net/"
// let sso = "https://sso.xlxt.net/";
// let view = 'https://exam.xlxt.net'
// let sale = 'https://sale.xlxt.net/';
// let vote = 'https://votenew.xlxt.net/';
// let lms = 'https://www.xlxt.net/';

const path = require('path')
const IP = require('./get-ip')
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/enterprise/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/Course/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/Member/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/Enterprise/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/Notice/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/CourseEnterprise/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/ArticleEnterprise/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/ReviewCourse/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/Sign/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/exam/*': {
        target: view,
        secure: false,
        changeOrigin: true,
      },
      '/Task/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/View/*': {
        target: view,
        secure: false,
        changeOrigin: true,
      },
      '/view/*': {
        target: view,
        secure: false,
        changeOrigin: true,
      },
      '/Article/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/Anonymous/*': {
        target: sale,
        secure: false,
        changeOrigin: true,
      },
      '/Default/*': {
        target: sale,
        secure: false,
        changeOrigin: true,
      },
      '/api': {
        target: vote,
        secure: false,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      },
      '/article': {
        target: www,
        secure: false,
        changeOrigin: true,
        pathRewrite:{
          '^/article':''
        }
      },
      '/DocumentEnterprise/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/ReviewArticle/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
      '/default/*': {
        target: sso,
        secure: false,
        changeOrigin: true,
      },
	    '/app/*': {
		    target: www,
		    secure: false,
		    changeOrigin: true,
	    },
	    '/AD/*': {
		    target: lms,
		    secure: false,
		    changeOrigin: true,
	    },
	    '/UserSSO/*': {
		    target: sso,
		    secure: false,
		    changeOrigin: true,
	    },
      '/CourseIndex/*': {
        target: www,
        secure: false,
        changeOrigin: true,
      },
	    '/Speaker/*': {
		    target: lms,
		    secure: false,
		    changeOrigin: true,
	    },
    },

    // Various Dev Server settings
    host: IP, // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../Merck/MerckAPP.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../Merck'),
    assetsSubDirectory: 'Merck',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

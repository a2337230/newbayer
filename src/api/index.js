import axios from "axios"; // 引入axios
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
import util from "@/common/js/util.js";
import {strError} from "./error";

export const baseUrl = {
  // 正式
  // ssoUrl: "https://sso.xlxt.net/",
  // examUrl: "https://exam.xlxt.net",
  // wwwUrl: "https://www.xlxt.net/",
  // sale:"https://sale.xlxt.net/",
  // exam: "https://exam.xlxt.net/",
  // vote: "https://votenew.xlxt.net/",
  // voteNew: "https://votenew.xlxt.net/",
  // lms: "https://www.xlxt.net/",
  // courseOss: "https://ossnew.xlxt.net",
  // lmsUrl: "https://www.xlxt.net/",
  // 测试
  // ssoUrl: "https://sso2.xlxt.net/",
  // examUrl: "https://exam4.xlxt.net",
  // wwwUrl: "https://www2.xlxt.net/",
  // sale:"https://sale2.xlxt.net/",
  // exam: "https://exam4.xlxt.net/",
  // vote: "https://votenew2.xlxt.net/",
  // voteNew: "https://votenew2.xlxt.net/",
  // lms: "https://www2.xlxt.net/",
  // courseOss: "https://ossnew2.xlxt.net",
  // lmsUrl: "https://www2.xlxt.net/",
  // 本地
  ssoUrl: "",
  examUrl: "",
  wwwUrl: "",
  sale: "",
  exam: "",
  vote: "/api",
  voteNew: "https://Votenew2.xlxt.net",
  lms: "",
  courseOss: "https://ossnew2.xlxt.net",
  lmsUrl: "",
};

axios.defaults.timeout = 10000;
//http request 请求拦截器
axios.interceptors.request.use(
	config => {
		const headers = {
			// 默克个人测试UK
			// 'k': '70049528b6a1a20739a449054fd35d23',
			// 'u': '1a744511c7709f670f772b2019298e95',
			// 默克企业测试UK
			// 'k': 'eeb90267c4b76dc1ba8a625cc48710df',
			// 'u': 'd4fd0616fab084ffec432fdd91c11629',
			// 默克杏林官方UK
			// 'k': '0ca5ce4f2088abacd5b2a389f855c7ec',
			// 'u': '56fd58b5cacd45e2820e5f19696736c3',
			'u': util.getCookie('UserID') ? util.getCookie('UserID') : util.getCookie('u'),
			'k': util.getCookie('token') ? util.getCookie('token') : util.getCookie('k'),
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		};
		config.headers = headers;
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);

//响应拦截器即异常处理
axios.interceptors.response.use(
	response => {
		// console.log(response,response.headers.u, util.getCookie('u'))
		if (response.headers.u) {
			util.setCookie("k", response.headers.k);
			util.setCookie("u", response.headers.u);
			// console.log(response,response.headers.u, util.getCookie('u'))
			return response;
		}
		return response;
	},
	err => {
		window.hideProgress ? window.hideProgress() : "";
		if (err && err.response) {
			switch (err.response.status) {
				case 400:
					console.log("错误请求");
					break;
				case 401:
					console.log("未授权，请重新登录");
					break;
				case 403:
					console.log("拒绝访问");
					break;
				case 404:
					console.log("请求错误,未找到该资源");
					break;
				case 405:
					console.log("请求方法未允许");
					break;
				case 408:
					console.log("请求超时");
					break;
				case 500:
					console.log("服务器端出错");
					break;
				case 501:
					console.log("网络未实现");
					break;
				case 502:
					console.log("网络错误");
					break;
				case 503:
					console.log("服务不可用");
					break;
				case 504:
					console.log("网络超时");
					break;
				case 505:
					console.log("http版本不支持该请求");
					break;
				default:
					console.log(`连接错误${err.response.status}`);
			}
		} else {
			console.log("连接到服务器失败");
		}
		let errorObj = {
			data: {
				Code: 5001, //显示网络错误
				Data: strError
			}
		};
		return Promise.resolve(errorObj);
	}
);

// get方法， 对应get请求 param {
//  String
// }
// url[请求的url地址] *
// param {
//    Object
//  }
// params[请求时携带的参数]
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: params
			})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data);
			});
	});
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data);
			});
	});
}

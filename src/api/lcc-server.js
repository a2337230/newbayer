import {baseUrl, get, post } from './index';
// 擂台跨域
let BASE_URL = baseUrl.examUrl


//首页
//获取轮播图数据
export const getBanner = (params) => get(baseUrl.lms+'/AD/GetAD', params);
//游戏跳转
export const getLekoGamesUrlParams = (params) => get(baseUrl.ssoUrl+'/UserSSO/GetLekoGamesUrlParams', params);

// 登录模块
// 验证手机号是否注册
export const checkLoginMobileAny = (params) => get(baseUrl.ssoUrl + '/UserSSO/CheckLoginMobileAny',params);
// 获取短信验证码
export const getMobileCode = (params) => post(baseUrl.ssoUrl + '/default/GetMobileCode',params);
// 验证手机号是否注册过
export const getValidLoginMobile = (params) => get(baseUrl.ssoUrl+ '/default/ValidLoginMobile', params);
// 短信登录
export const getPhoneLogin = (params) => post(baseUrl.ssoUrl+ '/default/SmsLogin', params);
// 注册
export const getUserRegister = (params) => post(baseUrl.ssoUrl + '/default/Register', params);
// 查询绑定
export const checkAppUserJoinEnterprise = (params) => get(baseUrl.wwwUrl + '/Member/CheckAppUserJoinEnterprise', params);
// 绑定企业
export const addAppUserJoinEnterprise = (params) => get(baseUrl.wwwUrl + '/Member/AddAppUserJoinEnterprise', params);
// 登录
export const getUser = (params) => get(baseUrl.wwwUrl + '/Enterprise/GetAppEnterpriseInfo',params);
// 退出
export const userSSOExit = (params) => post(baseUrl.ssoUrl + '/UserSSO/UserSSOExit', params);
// 获取用户
export const getAppMemberInfo = (params) => get(baseUrl.wwwUrl + '/Member/GetAppMemberInfo',params);
//获取首页默克头条
export const getArticleShow = (params) => get(baseUrl.wwwUrl + '/Article/GetArticleShow',params);
//得到当前用户绑定的角色
export const getRole = (params) => post(baseUrl.lms + '/Member/GetActivityUserJoinRole',params);
//用户绑定角色
export const addRole = (params) => post(baseUrl.lms + '/Member/AddActivityUserJoinRole',params);

//--------------- 医药头条------------//
//获取头条分类
export const  getHeadlineClassify = (params) => get(baseUrl.lms+'/app/GetChildByInfoParentIDShow', params);
//获取头条列表
export const  getHeadlineList = (params) => get(baseUrl.lms+'/app/GetAllArticleJoinClassify', params);
//获取文章评论表
export const  getCommentList = (params) => get(baseUrl.lms+'/app/GetArticleCommentShow', params);
//获取文章信息
export const  getArticle = (params) => get(baseUrl.lms+'/app/GetArticleByIDShow', params);
//文章点赞
export const  addArticleLike = (params) => get(baseUrl.lms+'/app/AddArticleLike', params);
//发表评论
export const  addArticleComment = (params) => get(baseUrl.lms+'/app/AddArticleComment', params);
//评论点赞
export const  addArticleReviewLike = (params) => get(baseUrl.lms+'/app/AddArticleReviewLike', params);
//检查积分赠送的状态
export const  checkGiveCoin = (params) => get(baseUrl.lms+'/Article/checkGiveCoin', params);
//赠送积分
export const  giveCoin = (params) => get(baseUrl.lms+'/Article/GiveCoin', params);

// 知识擂台
//获取知识擂台列表
export const  getKnowledgeArenaList = (params) => get(BASE_URL+'/view/GetExams', params);
//获取比赛详情
export const  getDetail = (params) => get(BASE_URL+'/view/Detail', params);
//获取比赛排名
export const  getExamOrder = (params) => get(BASE_URL+'/view/GetExamOrder', params);
//获取登录人当前排名
export const  getMyOrder = (params) => get(BASE_URL+'/view/GetMyOrder', params);
//比赛记录
export const  getExamRecord = (params) => get(BASE_URL+'/view/GetExamRecord', params);
//获取考试结果
export const  getExamResult = (params) => get(BASE_URL+'/view/GetExamResult', params);

//话术练习
//获取分类列表
export const  getSpeaks = (params) => get(baseUrl.lms+'/Speaker/GetSpeakCateForActivity', params);



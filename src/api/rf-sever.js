import {baseUrl, get, post } from './index'


// --------------------------------签到抽奖------------------------------------------------------------
// 获取签到记录
export const GetSignHistory = params => get(baseUrl.lms + '/Sign/MerckSignHistory', params)
// 签到
export const Sign = params => get(baseUrl.lms + '/Sign/MerckSign', params)
// 签到答题
export const GetSignQuestion = params => get(baseUrl.exam + '/View/MerckSignQuestion', params)
// 获取礼品列表
export const GetSignGifts = params => get(baseUrl.lms + '/Sign/MerckSignGifts', params)
// 签到抽奖
export const Lottery = params => get(baseUrl.lms + '/Sign/MerckLottery', params)
// 验证答题
export const MerckAddSignAnswe = params => get(baseUrl.lms + '/Sign/MerckAddSignAnswer', params)
// --------------------------------考试------------------------------------------------------------
// 获取企业考试列表
export const GetExamFront = params => get(baseUrl.examUrl + '/view/GetExamFront', params)
// 考试密码验证
export const GetJoinExam = params => get(baseUrl.examUrl + '/view/JoinExam', params)
// 考试规则
export const GetExamDetail = params => get(baseUrl.examUrl + '/view/Detail', params)
// 获取考试记录
export const GetExamRecord = params => get(baseUrl.examUrl + '/view/GetExamRecord', params)
// 验证密码
export const CheckIsPassword = params => get(baseUrl.examUrl + '/view/CheckIsPassword', params)
// 检测密码
export const CheckPassword = params => get(baseUrl.examUrl + '/view/CheckPassword', params)
// 获取题目
export const JoinExam = params => get(baseUrl.examUrl + '/view/JoinExam', params)
// 交卷
export const PostChallenge = params => post(baseUrl.examUrl + '/view/PostChallenge', params)
// 考试结果
export const GetExamResult = params => get(baseUrl.examUrl + '/view/GetExamResult', params)
// 考试结果排行榜
export const GetExamOrder = params => get(baseUrl.examUrl + '/view/GetExamOrder', params)
// 考试解析
export const GetErrorQuestions = params => get(baseUrl.examUrl + '/view/GetErrorQuestions', params)
// 自身排行
export const getmyorder = params => get(baseUrl.examUrl + '/view/getmyorder', params)
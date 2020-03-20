import {baseUrl, get, post } from './index';

// --------------------- 企业大学课程 -----------------------
//
// 所有课程分类
export const GetAllClassify = (params) => post(baseUrl.wwwUrl+'/Course/GetAllClassify', params);
// 课程列表
export const GetCourseList = (params) => get(baseUrl.wwwUrl+'/CourseEnterprise/GetCourseList', params);
export const GetCourseFront = (params) => get(baseUrl.wwwUrl+'/Course/GetCourseFront', params);
// 课程信息
export const GetCourseInfo = (params) => get(baseUrl.wwwUrl+'/CourseEnterprise/GetCourseInfo', params);
// 课程章节列表
export const GetChapterList = (params) => get(baseUrl.wwwUrl+'/CourseEnterprise/GetChapterList', params);
// 章节下的课件列表
export const GetEnterpriseCoursewareList = (params) => get(baseUrl.wwwUrl+'/CourseEnterprise/GetEnterpriseCoursewareList', params);
// 课件信息
export const GetCoursewareInfo = (params) => get(baseUrl.wwwUrl+'/CourseEnterprise/GetCoursewareInfo', params);
// 课程推荐列表
export const CourseRecommendList = (params) => get(baseUrl.wwwUrl+'/CourseEnterprise/CourseRecommendList', params);

// ------------------- 企业课程评论 -------------------------
// 获取评论+回复列表
export const GetReview = (params) => get(baseUrl.wwwUrl+'/ReviewCourse/GetReview', params);
// 添加评论
export const AddReview = (params) => post(baseUrl.wwwUrl+'/ReviewCourse/AddReview', params);
// 评论点赞
export const AddReviewLike = (params) => post(baseUrl.wwwUrl+'/ReviewCourse/AddReviewLike', params);
// 添加评论回复
export const AddReviewReply = (params) => post(baseUrl.wwwUrl+'/ReviewCourse/AddReviewReply', params);
// 回复点赞
export const AddReviewReplyLike = (params) => post(baseUrl.wwwUrl+'/ReviewCourse/AddReviewReplyLike', params);
// 文档播放
export const GetDocumentInfo = (params) => post(baseUrl.wwwUrl+'/DocumentEnterprise/GetDocumentInfo', params);
// 更新课程进度
export const UpdateStudyCourseProgress = (params) => post(baseUrl.wwwUrl+'/Course/UpdateStudyCourseProgress', params);
// 考试ID
export const GetCourseJoinExam = (params) => post(baseUrl.wwwUrl+'/Course/GetCourseJoinExamFront', params);

// --------------------- 首页课程 -----------------------
// 课程列表
export const GetIndexCourseList = (params) => get(baseUrl.wwwUrl+'/CourseIndex/GetCourseList', params);
// 课程信息
export const GetIndexCourseInfo = (params) => get(baseUrl.wwwUrl+'/CourseIndex/GetCourseInfo', params);
// 课程章节列表
export const GetIndexChapterList = (params) => get(baseUrl.wwwUrl+'/CourseIndex/GetChapterList', params);
// 章节下的课件列表
export const GetIndexCoursewareList = (params) => get(baseUrl.wwwUrl+'/CourseIndex/GetIndexCoursewareList', params);
// 课件信息
export const GetIndexCoursewareInfo = (params) => get(baseUrl.wwwUrl+'/CourseIndex/GetCoursewareInfo', params);
// 课程推荐列表
export const indexCourseRecommendList = (params) => get(baseUrl.wwwUrl+'/CourseIndex/CourseRecommendList', params);

// AD
export const GetAD = (params) => get(baseUrl.wwwUrl+'/AD/GetAD', params);
// 判断课程是否购买过
export const CheckCourseBuy = (params) => get(baseUrl.wwwUrl+'/Course/CheckCourseBuy', params);
// 首页试看视频课程章节列表
// export const GetChapterCoursewareShow = (params) => get(baseUrl.wwwUrl+'/Course/GetChapterCoursewareShow', params);
// 首页试看评论+回复列表
export const GetReviewShow = (params) => get(baseUrl.wwwUrl+'/ReviewCourse/GetReviewShow', params);
// new 分类
export const GetAllCourseClassify = (params) => get(baseUrl.courseOss+'/Course/GetAllCourseClassify', params);
// new 根据分类查询课程列表
export const GetAllCourseJoinClassify = (params) => get(baseUrl.courseOss+'/Course/GetAllCourseJoinClassify', params);
// new 分类 (需登录)
export const GetAllCourseJoinClassifyUS = (params) => get(baseUrl.courseOss+'/Course/GetAllCourseJoinClassifyUS', params);
// new 根据分类查询课程列表 (需登录)
export const GetAllCourseClassifyUS = (params) => get(baseUrl.courseOss+'/Course/GetAllCourseClassifyUS', params);
// 内部课程分类
export const GetChildByInfoParentID = (params) => get(baseUrl.wwwUrl+'/Course/GetChildByInfoParentID', params);
export const GetClassChildByInfoParentID = (params) => get(baseUrl.wwwUrl+'/Course/GetClassChildByInfoParentID', params);

// 默克 new
// 得到当前用户绑定的角色
export const GetActivityUserJoinRole = (params) => get(baseUrl.wwwUrl+'/Member/GetActivityUserJoinRole', params);
// 用户绑定角色
export const AddActivityUserJoinRole = (params) => get(baseUrl.wwwUrl+'/Member/AddActivityUserJoinRole', params);
// 课程-检查积分赠送状态
export const checkGiveCoin = (params) => get(baseUrl.wwwUrl+'/Course/checkGiveCoin', params);
// 课程-积分赠送
export const GiveCoin = (params) => get(baseUrl.wwwUrl+'/Course/GiveCoin', params);
// 活动-获取课件信息
export const GetCoursewareByIDActivity = (params) => get(baseUrl.wwwUrl+'/Course/GetCoursewareByIDActivity', params);

export const GetCourseByIDShow = (params) => get(baseUrl.wwwUrl+'/Course/GetCourseByIDShow', params);
export const UpdateCourseBrowseNum = (params) => get(baseUrl.wwwUrl+'/Course/UpdateCourseBrowseNum', params);
export const GetChapterCoursewareShow = (params) => get(baseUrl.wwwUrl+'/Course/GetChapterCoursewareShow', params);

var express = require('express')
const router = express.Router()
const webAllController = require('../controllers/webAllController')

// 首页
router.get('/v1/index', webAllController.index)

// 房屋分类
router.get('/v1/houses/list', webAllController.housesList)

// 房屋详情
router.get('/v1/houses/detail', webAllController.housesDetail)

// 房屋推荐
router.get('/v1/houses/recommend', webAllController.housesRecommend)

// 房屋筛选
router.get('/v1/houses/filter') 

// 新闻列表
router.get('/v1/news/list', webAllController.newsList)

// 新闻详情
router.get('/v1/news/detail', webAllController.newsDetail)

// 测试详情获取数据
router.get('/v1/houses/test-detail', webAllController.testDetail)

module.exports = router
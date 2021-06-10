var express = require('express')
// const app = express()
const router = express.Router()
const newsController = require('../controllers/newsController')
const commonController = require('../controllers/commonController')
const trafficController = require('../controllers/trafficController')
const facilitiesController = require('../controllers/facilitiesController')

function area (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //带cookies
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
}


router.post('/upload-image', area, commonController.uploadImage)

// 新闻分类
router.get('/news/category', newsController.newsCategory)

// 新闻列表
router.get('/news/list', newsController.newsList)

// 添加新闻
router.post('/news/add', newsController.newsAdd)

// 删除新闻
router.post('/news/delete', newsController.newsDelete)

// 新闻详情
router.get('/news/detail', newsController.newsDetail)

// 编辑新闻
router.post('/news/edit', newsController.newsEdit)

// 是否推荐
router.post('/news/recommend', newsController.newsRecommend)

// 交通信息
router.get('/traffic', trafficController.trafficList)

// 添加交通信息
router.post('/traffic/add', trafficController.trafficAdd)

// 编辑交通信息
router.post('/traffic/edit', trafficController.trafficEdit)

// 删除交通信息
router.post('/traffic/delete', trafficController.trafficDelete)

// 公共设施信息
router.get('/public-facility', facilitiesController.publicFacility)

// 添加公共设施
router.post('/public-facility/add', facilitiesController.publicFacilityAdd)

// 编辑公共设施
router.post('/public-facility/edit', facilitiesController.publicFacilityEdit)

// 删除公共设施
router.post('/public-facility/delete', facilitiesController.publicFacilityDelete)

// 便利设施信息
router.get('/convenient-facility', facilitiesController.convenientFacility)

// 添加便利设施
router.post('/convenient-facility/add', facilitiesController.convenientFacilityAdd)

// 编辑便利设施
router.post('/convenient-facility/edit', facilitiesController.convenientFacilityEdit)

// 删除便利设施
router.post('/convenient-facility/delete', facilitiesController.convenientFacilityDelete)



module.exports = router
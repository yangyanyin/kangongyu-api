var express = require('express')
// const app = express()
const router = express.Router()
const newsController = require('../controllers/newsController')
const commonController = require('../controllers/commonController')
const trafficController = require('../controllers/trafficController')
const facilitiesController = require('../controllers/facilitiesController')
const housesController = require('../controllers/housesController')
const estateController = require('../controllers/estateController')

function area (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //带cookies
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
}

// 上传图片
router.post('/upload-image', area, commonController.uploadImage)

// 获取筛选向
router.get('/filter', commonController.filter)

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

// 新闻推荐
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

// 添加房屋信息
router.post('/houses/add', housesController.housesAdd)

// 获取房屋详情
router.get('/houses/detail', housesController.housesDetail)

// 获取房屋列表
router.get('/houses/list', housesController.housesList)

// 是否推荐
router.post('/houses/recommend', housesController.housesRecommend)

// 删除房屋
router.post('/houses/delete', housesController.housesDelete)

// 编辑房屋信息
router.post('/houses/edit', housesController.housesEdit)

// 添加商业地产
router.post('/estate/add', estateController.estateAdd)

// 获取地产列表
router.get('/estate/list', estateController.estateList)

// 删除地产
router.post('/estate/delete', estateController.estateDelete)

// 获取地产详情
router.get('/estate/detail', estateController.estateDetail)

// 获取地产详情
router.post('/estate/edit', estateController.estateEdit)


module.exports = router
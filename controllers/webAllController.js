const Joi = require('joi');
const webAllServer = require('../server/webAllServer')

// 首页
module.exports.index = (req, res) => {
  const newsParams = {
    type: 'buy-house',
    page: 1,
    page_size: 2
  }
  let newHouseParams = {
    page: 1,
    page_size: 8
  }
  const news = webAllServer.getNewsList(newsParams)
  newHouseParams.category = 'new-house'
  const newHouse = webAllServer.getHousesList(newHouseParams)
  newHouseParams.category = 'second-hand-house'
  const secondHand = webAllServer.getHousesList(newHouseParams)
  newHouseParams.category = 'rent-house'
  const renting = webAllServer.getHousesList(newHouseParams)
  Promise.all([news, newHouse, secondHand, renting]).then(result => {
    res.json({
      code: 200,
      data: {
        news: result[0].data,
        new_house: result[1].data,
        second_hand_house: result[2].data,
        rent_house: result[3].data
      }
    })
  })
}

// 新闻列表
module.exports.newsList = (req, res) => {
  const schema = Joi.object({
    type: Joi.string(),
    size: Joi.number(),
    page_size: Joi.number()
  })
  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    webAllServer.getNewsList(value).then(result => {
      res.json(result)
    })
  }
}

// 新闻详情
module.exports.newsDetail = (req, res) => {
  const schema = Joi.object({
    id: Joi.number()
  })
  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    webAllServer.getNewsDetail(value).then(result => {
      res.json(result)
    })
  }
}

// 房屋列表
module.exports.housesList = (req, res) => {
  const schema = Joi.object({
    category: Joi.string(),
    page: Joi.number(),
    page_size: Joi.number()
  })
  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    webAllServer.getHousesList(value).then(result => {
      res.json(result)
    })
  }
}


// 房屋推荐
module.exports.housesRecommend = (req, res) => {
  const schema = Joi.object({
    category: Joi.string()
  })
  const { error, value } = schema.validate(req.query)
  value.recommend = 1
  value.size = 1
  value.page_size = 100
  if (error) {
    res.json({
      msg: error
    })
  } else {
    webAllServer.getHousesList(value).then(result => {
      res.json(result)
    })
  }
}

// 房屋详情
module.exports.housesDetail = (req, res) => {
  const schema = Joi.object({
    id: Joi.number()
  })
  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    webAllServer.getHousesDetail(value).then(result => {
      res.json(result)
    })
  }
}
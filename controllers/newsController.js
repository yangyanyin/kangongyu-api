const Joi = require('joi');
const newsServer = require('../server/newsServer')

// 新闻分类
module.exports.newsCategory = (req, res) => {
  newsServer.getNewsCategory().then(result => {
    res.json(result)
  })
}

// 新闻列表
module.exports.newsList = (req, res) => {
  const schema = Joi.object({
    type: Joi.string()
  })
  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    newsServer.getNewsList(value).then(result => {
      res.json(result)
    })
  }
  
}

// 添加新闻
module.exports.newsAdd = (req, res) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    recommend: Joi.string().required(),
    content: Joi.string().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    newsServer.newsAdd(value).then(result => {
      res.json({
        msg: 'ok'
      })
    })
  }
}

// 删除新闻
module.exports.newsDelete = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    newsServer.newsDelete(value).then(result => {
      res.json(result)
    })
  }
}

// 新闻详情
module.exports.newsDetail = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    newsServer.getNewsDetail(value).then(result => {
      res.json(result)
    })
  }
}

// 编辑新闻
module.exports.newsEdit = (req, res) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    recommend: Joi.number().required(),
    content: Joi.string().required(),
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    newsServer.newsEdit(value).then(result => {
      res.json(result)
    })
  }
}

// 推荐新闻
module.exports.newsRecommend = (req, res) => {
  const schema = Joi.object({
    recommend: Joi.number().required(),
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    newsServer.updateNewsRecommend(value).then(result => {
      res.json(result)
    })
  }
}

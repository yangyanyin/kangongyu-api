const Joi = require('joi');
const trafficServer = require('../server/trafficServer')

// 交通列表
module.exports.trafficList = (req, res) => {
  trafficServer.getTrafficList().then(result => {
    res.json(result)
  })
}

// 添加交通信息
module.exports.trafficAdd = (req, res) => {
  const schema = Joi.object({
    color: Joi.string().required(),
    name: Joi.string().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    trafficServer.trafficAdd(value).then(result => {
      res.json(result)
    })
  }
}

// 编辑交通信息
module.exports.trafficEdit = (req, res) => {
  const schema = Joi.object({
    color: Joi.string().required(),
    name: Joi.string().required(),
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    trafficServer.trafficEdit(value).then(result => {
      res.json(result)
    })
  }
}

// 删除交通信息
module.exports.trafficDelete = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    trafficServer.trafficDelete(value).then(result => {
      res.json(result)
    })
  }
}
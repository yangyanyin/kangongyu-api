const Joi = require('joi');
const estateServer = require('../server/estateServer')
const qs = require('qs');

// 添加
module.exports.estateAdd = (req, res) => {
  const schema = Joi.object({
    category: Joi.string().empty(''),
    title: Joi.string().empty(''),
    coordinate: Joi.string().empty(''),
    vr_link: Joi.string().empty(''),
    buy_price: Joi.string().empty(''),
    lease_price: Joi.string().empty(''),
    title_deed: Joi.string().empty(''),
    completion_time: Joi.string().empty(''),
    types_of: Joi.string().empty(''),
    address: Joi.string().empty(''),
    height: Joi.string().empty(''),
    floor: Joi.string().empty(''),
    area: Joi.string().empty(''),
    introduction: Joi.string().empty(''),
    facilities: Joi.array().empty(''),
    traffic: Joi.array().empty(''),
    images: Joi.array().empty('')
  })
  const { error, value } = schema.validate(qs.parse(req.body))
  if (error) {
    res.json({
      msg: error
    })
  } else {
    estateServer.estateAdd(value).then((result) => {
      res.json(result)
    })
  }
}

// 地产列表
module.exports.estateList = (req, res) => {
  const schema = Joi.object({
    category: Joi.string()
  })

  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    estateServer.getEstateList(value).then((result) => {
      res.json(result)
    })
  }
}

// 删除地产信息
module.exports.estateDelete = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    estateServer.estateDelete(value).then(result => {
      res.json(result)
    })
  }
}


// 地产详情
module.exports.estateDetail = (req, res) => {
  const schema = Joi.object({
    id: Joi.number()
  })

  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    estateServer.getEstateDetail(value).then((result) => {
      res.json(result)
    })
  }
}


// 编辑房屋信息
module.exports.estateEdit = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().empty(''),
    coordinate: Joi.string().empty(''),
    vr_link: Joi.string().empty(''),
    buy_price: Joi.string().empty(''),
    lease_price: Joi.string().empty(''),
    title_deed: Joi.string().empty(''),
    completion_time: Joi.string().empty(''),
    types_of: Joi.string().empty(''),
    address: Joi.string().empty(''),
    height: Joi.string().empty(''),
    floor: Joi.string().empty(''),
    area: Joi.string().empty(''),
    introduction: Joi.string().empty(''),
    facilities: Joi.array().empty(''),
    traffic: Joi.array().empty(''),
    images: Joi.array().empty('')
  })
  const { error, value } = schema.validate(qs.parse(req.body))
  if (error) {
    res.json({
      msg: error
    })
  } else {
    estateServer.estateEdit(value).then((result) => {
      res.json(result)
    })
  }
}
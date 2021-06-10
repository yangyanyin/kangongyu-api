const Joi = require('joi');
const facilitiesServer = require('../server/facilitiesServer')

/**
 * 公共设施
 */
module.exports.publicFacility = (req, res) => {
  facilitiesServer.getPublicFacility().then(result => {
    res.json(result)
  })
}

// 添加公共设施
module.exports.publicFacilityAdd = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    facilitiesServer.publicFacilityAdd(value).then(result => {
      res.json(result)
    })
  }
}

// 编辑交通信息
module.exports.publicFacilityEdit = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    facilitiesServer.publicFacilityEdit(value).then(result => {
      res.json(result)
    })
  }
}

// 删除交通信息
module.exports.publicFacilityDelete = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    facilitiesServer.publicFacilityDelete(value).then(result => {
      res.json(result)
    })
  }
}
/** 公共设施 End */

/** 便利设施 */
module.exports.convenientFacility = (req, res) => {
  facilitiesServer.getConvenientFacility().then(result => {
    res.json(result)
  })
}

// 添加便利设施
module.exports.convenientFacilityAdd = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    facilitiesServer.convenientFacilityAdd(value).then(result => {
      res.json(result)
    })
  }
}

// 编辑便利信息
module.exports.convenientFacilityEdit = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    facilitiesServer.convenientFacilityEdit(value).then(result => {
      res.json(result)
    })
  }
}

// 删除便利信息
module.exports.convenientFacilityDelete = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    facilitiesServer.convenientFacilityDelete(value).then(result => {
      res.json(result)
    })
  }
}
/** 便利设施 End */
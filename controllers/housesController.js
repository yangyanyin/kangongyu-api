const Joi = require('joi');
const housesServer = require('../server/housesServer')
const qs = require('qs');
const { json } = require('express');

// 添加房屋信息
module.exports.housesAdd = (req, res) => {
  const schema = Joi.object({
    category: Joi.string().empty(''),
    title: Joi.string().empty(''),
    title_tag: Joi.string().empty(''),
    coordinate: Joi.string().empty(''),
    address: Joi.string().empty(''),
    name: Joi.string().empty(''),
    name_tag: Joi.string().empty(''),
    vr_link: Joi.string().empty(''),
    price: Joi.string().empty(''),
    developer: Joi.string().empty(''),
    estate_type: Joi.string().empty(''),
    property: Joi.string().empty(''),
    construction_area: Joi.string().empty(''),
    opening_date: Joi.string().empty(''),
    completed_date: Joi.string().empty(''),
    payment: Joi.string().empty(''),
    live: Joi.string().empty(''),
    use_water: Joi.string().empty(''),
    use_electricity: Joi.string().empty(''),
    lease_term: Joi.string().empty(''),
    house_introduction: Joi.string().empty(''),
    lease_way: Joi.string().empty(''),
    look_houses: Joi.string().empty(''),
    floor: Joi.string().empty(''),
    traffic: Joi.array().empty(''),
    traffic_tips: Joi.string().empty(''),
    apartment_facilities: Joi.array().empty(''),
    images: Joi.array().empty(''),
    effect_images: Joi.array().empty(''),
    sample_room_images: Joi.array().empty(''),
    surrounding_images: Joi.array().empty(''),
    filter_area: Joi.array().empty(''),
    filter_house: Joi.array().empty(''),
    filter_price: Joi.array().empty(''),
    filter_region: Joi.array().empty(''),
    unit_type: Joi.array().empty(''),
    supporting_facilities: Joi.array().empty(''),
    introduction: Joi.string().empty(''),
    recommend: Joi.number(),
    elevator: Joi.number(),
    gas: Joi.number(),
    parking_space: Joi.number()
  })
  const { error, value } = schema.validate(qs.parse(req.body))
  if (error) {
    res.json({
      msg: error
    })
  } else {
    housesServer.housesAdd(value).then((result) => {
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
    housesServer.getHousesDetail(value).then((result) => {
      res.json(result)
    })
  }
}

// 房屋列表
module.exports.housesList = (req, res) => {
  const schema = Joi.object({
    category: Joi.string()
  })

  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    housesServer.getHousesList(value).then((result) => {
      res.json(result)
    })
  }
}

// 房屋推荐
module.exports.housesRecommend = (req, res) => {
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
    housesServer.updateHousesRecommend(value).then(result => {
      res.json(result)
    })
  }
}

// 删除房屋信息
module.exports.housesDelete = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    housesServer.housesDelete(value).then(result => {
      res.json(result)
    })
  }
}

// 编辑房屋信息
module.exports.housesEdit = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().empty(''),
    title_tag: Joi.string().empty(''),
    coordinate: Joi.string().empty(''),
    address: Joi.string().empty(''),
    name: Joi.string().empty(''),
    name_tag: Joi.string().empty(''),
    vr_link: Joi.string().empty(''),
    price: Joi.string().empty(''),
    developer: Joi.string().empty(''),
    estate_type: Joi.string().empty(''),
    property: Joi.string().empty(''),
    construction_area: Joi.string().empty(''),
    opening_date: Joi.string().empty(''),
    completed_date: Joi.string().empty(''),
    payment: Joi.string().empty(''),
    live: Joi.string().empty(''),
    use_water: Joi.string().empty(''),
    use_electricity: Joi.string().empty(''),
    lease_term: Joi.string().empty(''),
    house_introduction: Joi.string().empty(''),
    lease_way: Joi.string().empty(''),
    look_houses: Joi.string().empty(''),
    floor: Joi.string().empty(''),
    traffic: Joi.array().empty(''),
    traffic_tips: Joi.string().empty(''),
    apartment_facilities: Joi.array().empty(''),
    images: Joi.array().empty(''),
    effect_images: Joi.array().empty(''),
    sample_room_images: Joi.array().empty(''),
    surrounding_images: Joi.array().empty(''),
    filter_area: Joi.array().empty(''),
    filter_house: Joi.array().empty(''),
    filter_price: Joi.array().empty(''),
    filter_region: Joi.array().empty(''),
    unit_type: Joi.array().empty(''),
    supporting_facilities: Joi.array().empty(''),
    introduction: Joi.string().empty(''),
    recommend: Joi.number(),
    elevator: Joi.number(),
    gas: Joi.number(),
    parking_space: Joi.number(),
  })
  const { error, value } = schema.validate(qs.parse(req.body))
  if (error) {
    res.json({
      msg: error
    })
  } else {
    housesServer.housesEdit(value).then((result) => {
      res.json(result)
    })
  }
}
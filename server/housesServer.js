const SQL = require('../tools/mysql/index')

// 添加房屋信息
module.exports.housesAdd = (value) => {
  return new Promise((resolve, reject) => {
    let key = ''
    let val = ''
    const str = ['traffic', 'apartment_facilities', 'supporting_facilities', 'images', 'effect_images', 'sample_room_images', 'surrounding_images', 'filter_area', 'filter_house', 'filter_price', 'filter_price', 'filter_region', 'unit_type']
    for (let k in value) {
      key += `\`${k}\`,`
      if (str.indexOf(k) >= 0) {
        val += `'${JSON.stringify(value[k])}',`
      } else if (['recommend', 'id'].indexOf(k) >= 0) {
        val += `${value[k]},`
      } else if (k === 'introduction') {
        val += `'${value[k].replace(/'/g, "\\'")}',`
      } else {
        val += `'${value[k]}',`
      }
      
    }
    key = key.substr(0, key.length - 1)
    val = val.substr(0, val.length - 1)
    const sql = `INSERT INTO house_detail
    (${key})
    VALUES
    (${val})
    `
    SQL(sql, function (data) {
      resolve({
        code: 200,
        mgs: '添加成功'
      })
    })
  }) 
}

// 获取房屋详情
module.exports.getHousesDetail = (value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM house_detail WHERE id = ${value.id}`
    SQL(sql, function (data) {
      data.map(item => {
        item.images = JSON.parse(item.images)
        item.unit_type = JSON.parse(item.unit_type)
        item.apartment_facilities = item.apartment_facilities ? JSON.parse(item.apartment_facilities).map(Number) : ''
        item.supporting_facilities = item.supporting_facilities ? JSON.parse(item.supporting_facilities).map(Number) : ''
        item.filter_area = item.filter_area ? JSON.parse(item.filter_area).map(Number) : ''
        item.filter_house = item.filter_house ? JSON.parse(item.filter_house).map(Number) : ''
        item.filter_price = item.filter_price ? JSON.parse(item.filter_price).map(Number) : ''
        item.filter_region = item.filter_region ? JSON.parse(item.filter_region).map(Number) : ''
        item.traffic = item.traffic ? JSON.parse(item.traffic).map(Number) : ''
        item.surrounding_images = JSON.parse(item.surrounding_images)
        item.effect_images = JSON.parse(item.effect_images)
        item.sample_room_images = JSON.parse(item.sample_room_images)
      })
      resolve({
        code: 200,
        data: data[0]
      })
    })
  })
}

// 获取房屋列表
module.exports.getHousesList = (value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, title, \`name\`, price, images, unit_type, update_at, recommend  FROM house_detail WHERE category = '${value.category}'`
    SQL(sql, function (data) {
      data.map(item => {
        item.image = item.images ? JSON.parse(item.images)[0] : ''
        item.images = JSON.parse(item.images)
        item.unit_type = JSON.parse(item.unit_type)
      })
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

// 房屋推荐
module.exports.updateHousesRecommend = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE house_detail SET recommend = ${params.recommend} WHERE id = ${params.id}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '设置成功'
      })
    })
  })
}

// 删除房屋信息
module.exports.housesDelete = (params) => {
  return new Promise((resolve, reject) => {
    const id = params.id
    const sql = `DELETE FROM house_detail WHERE id = ${id}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '删除成功'
      })
    })
  })
}

// 编辑房屋
module.exports.housesEdit = (params) => {
  return new Promise((resolve, reject) => {
    let s = ''
    const str = ['traffic', 'apartment_facilities', 'supporting_facilities', 'images', 'effect_images', 'sample_room_images', 'surrounding_images', 'filter_area', 'filter_house', 'filter_price', 'filter_price', 'filter_region', 'unit_type']
    for (const key in params) {
      if (['recommend', 'id'].indexOf(key) >= 0) {
        s += `\`${key}\` = ${params[key]},`
      } else if (key === 'introduction') {
        s += `\`${key}\` = '${params[key].replace(/'/g, "\\'")}',`
      } else if (str.indexOf(key) >= '0') {
        s += `\`${key}\` = '${JSON.stringify(params[key])}',`
      } else {
        s += `\`${key}\` = '${params[key]}',`
      }
    }
    s = s.substr(0, s.length - 1)
    const sql = `UPDATE house_detail SET ${s} WHERE id = ${params.id}`
    SQL(sql, function () {
      resolve({
        code: 200,
        msg: '修改成功'
      })
    })
  })
}

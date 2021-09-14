const SQL = require('../tools/mysql/index')

module.exports.getTraffic = (value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT \`name\`, colot FROM traffic WHERE id IN(${value.id})`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

// 获取新闻列表
module.exports.getNewsList = (value) => {
  return new Promise((resolve, reject) => {
    const pageSize = value.page_size
    const page = (value.page - 1) * pageSize
    const sql = `SELECT id, title, description, image FROM news WHERE type = '${value.type}' LIMIT ${page}, ${pageSize}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

// 获取新闻详情
module.exports.getNewsDetail = (value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT title, description, update_at, content FROM news WHERE id = ${value.id}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        data: {
          news: data[0]
        }
      })
    })
  })
}

// 获取房屋列表
module.exports.getHousesList = (value) => {
  return new Promise((resolve, reject) => {
    const pageSize = value.page_size
    const page = (value.page - 1) * pageSize
    let where = `category = '${value.category}'`
    if (value.recommend) {
      where = `category = '${value.category}' AND recommend = 1`
    }
    const sql = `SELECT 
      hd.id, hd.title, hd.title_tag, hd.images, hd.price, hd.vr_link, hd.unit_type,
      GROUP_CONCAT(DISTINCT JSON_OBJECT('name',tf.\`name\`, 'color',tf.color)) as traffics,
      GROUP_CONCAT(DISTINCT fa.region) as region
      FROM house_detail hd
      INNER JOIN traffic tf ON FIND_IN_SET(tf.id, hd.traffic)
      INNER JOIN filter_region fa ON FIND_IN_SET(fa.id, hd.filter_region)
      WHERE
      ${where}
      GROUP BY hd.id
      LIMIT ${page}, ${pageSize}`
    SQL(sql, function (data) {
      data.map(item => {
        item.images = JSON.parse(item.images)
        item.unit_type = JSON.parse(item.unit_type)
        item.traffics = JSON.parse(`[${item.traffics}]`)
      })
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

// 获取房屋详情
module.exports.getHousesDetail = (value) => {
  return new Promise((resolve, reject) => {
    let show_key = `hd.title, hd.title_tag, hd.name_tag, hd.coordinate, hd.vr_link, hd.price, 
    hd.estate_type, hd.construction_area, hd.traffic_tips, hd.images, hd.address, hd.introduction,
    GROUP_CONCAT(DISTINCT JSON_OBJECT('id', tf.id, 'name', tf.\`name\`, 'color', tf.color)) as traffics,
    GROUP_CONCAT(DISTINCT pf.\`name\`) as public_facility,
    GROUP_CONCAT(DISTINCT fa.region) as region
    `
    let inner = `INNER JOIN public_facility pf ON FIND_IN_SET(pf.id, hd.apartment_facilities)
    INNER JOIN traffic tf ON FIND_IN_SET(tf.id, hd.traffic)
    INNER JOIN filter_region fa ON FIND_IN_SET(fa.id, hd.filter_region)`
    if (value.category === 'renting') {
      show_key += `, hd.floor, hd.payment, hd.live, hd.use_water, hd.use_electricity, hd.lease_term, hd.elevator, 
      hd.parking_space, hd.gas, hd.lease_way, hd.house_introduction, hd.look_houses, 
      GROUP_CONCAT(DISTINCT JSON_OBJECT('name', cf.\`name\`, 'image', cf.image)) as supporting_facility`
      inner += `INNER JOIN convenient_facility cf ON FIND_IN_SET(cf.id, hd.supporting_facilities)`
    } else {
      show_key += `, hd.developer, hd.\`name\`, hd.property, hd.unit_type, hd.opening_date, hd.completed_date, hd.effect_images, hd.sample_room_images, hd.surrounding_images`
    }

    const sql = `SELECT 
    ${show_key} 
    FROM house_detail hd
    ${inner}
    WHERE hd.id = ${value.id}
    `
    SQL(sql, function (data) {
      data.map(item => {
        item.title_tag = item.title_tag ? item.title_tag.split(',') : '',
        item.name_tag = item.name_tag ? item.name_tag.split(',') : '',
        item.traffics = item.traffics ? JSON.parse(`[${item.traffics}]`) : '',
        item.unit_type = item.unit_type ? JSON.parse(item.unit_type) : '',
        item.images = JSON.parse(item.images),
        item.effect_images = item.effect_images ? JSON.parse(item.effect_images) : ''
        item.sample_room_images = item.sample_room_images ? JSON.parse(item.sample_room_images) : ''
        item.surrounding_images = item.surrounding_images ? JSON.parse(item.surrounding_images) : ''
        item.supporting_facility = item.supporting_facility ? JSON.parse(`[${item.supporting_facility}]`) : ''
        item.public_facility = item.public_facility ? item.public_facility.split(',') : ''
      })
      resolve({
        code: 200,
        data: data[0]
      })
    })
  })
}

// GROUP_CONCAT 合并
// DISTINCT 去重
// JSON_OBJECT 转JSON
module.exports.testDetail = (value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
    hd.traffic, 
    GROUP_CONCAT(DISTINCT JSON_OBJECT('id', tf.id, 'name', tf.\`name\`, 'color', tf.color)) as traffics 
    FROM house_detail hd
    INNER JOIN traffic tf ON FIND_IN_SET(tf.id, hd.traffic)
    WHERE hd.id = ${value.id}`
    SQL(sql, function (data) {
      const t = JSON.parse(`[${data[0].traffics}]`)
      resolve({
        code: 200,
        data: t
      })
    })
  })
}
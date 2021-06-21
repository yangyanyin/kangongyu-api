const SQL = require('../tools/mysql/index')

// 添加房屋信息
module.exports.estateAdd = (value) => {
  return new Promise((resolve, reject) => {
    let key = ''
    let val = ''
    const str = ['traffic', 'facilities', 'images']
    for (let k in value) {
      key += `${k},`
      if (str.indexOf(k) >= 0) {
        val += `'${JSON.stringify(value[k])}',`
      } else if (k === 'introduction') {
        val += `'${value[k].replace(/'/g, "\\'")}',`
      } else {
        val += `'${value[k]}',`
      }
      
    }
    key = key.substr(0, key.length - 1)
    val = val.substr(0, val.length - 1)
    const sql = `INSERT INTO estate_detail
    (${key})
    VALUES
    (${val})
    `
    console.log(sql, 'ss')
    SQL(sql, function (data) {
      resolve({
        code: 200,
        mgs: '添加成功'
      })
    })
  }) 
}

// 获取地产列表
module.exports.getEstateList = (value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, title, buy_price, lease_price, images, update_at  FROM estate_detail WHERE category = '${value.category}'`
    SQL(sql, function (data) {
      data.map(item => {
        item.image = item.images ? JSON.parse(item.images)[0] : ''
        item.images = JSON.parse(item.images)
      })
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

// 删除地产信息
module.exports.estateDelete = (params) => {
  return new Promise((resolve, reject) => {
    const id = params.id
    const sql = `DELETE FROM estate_detail WHERE id = ${id}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '删除成功'
      })
    })
  })
}

// 获取地产详情
module.exports.getEstateDetail = (value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM estate_detail WHERE id = ${value.id}`
    SQL(sql, function (data) {
      data.map(item => {
        item.images = JSON.parse(item.images)
        item.facilities = item.facilities ? JSON.parse(item.facilities).map(Number) : ''
        item.traffic = item.traffic ? JSON.parse(item.traffic).map(Number) : ''
      })
      resolve({
        code: 200,
        data: data[0]
      })
    })
  })
}


// 编辑地产
module.exports.estateEdit = (params) => {
  return new Promise((resolve, reject) => {
    let s = ''
    const str = ['traffic', 'facilities', 'images']
    for (const key in params) {
      if (['id'].indexOf(key) >= 0) {
        s += `${key} = ${params[key]},`
      } else if (key === 'introduction') {
        s += `${key} = '${params[key].replace(/'/g, "\\'")}',`
      } else if (str.indexOf(key) >= '0') {
        s += `${key} = '${JSON.stringify(params[key])}',`
      } else {
        s += `${key} = '${params[key]}',`
      }
    }
    s = s.substr(0, s.length - 1)
    const sql = `UPDATE estate_detail SET ${s} WHERE id = ${params.id}`
    SQL(sql, function () {
      resolve({
        code: 200,
        msg: '修改成功'
      })
    })
  })
}

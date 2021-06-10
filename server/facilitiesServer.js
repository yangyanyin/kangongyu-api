const SQL = require('../tools/mysql/index')

/** 公共设施 */
module.exports.getPublicFacility = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM public_facility`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

module.exports.publicFacilityAdd = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO
    public_facility
      (name) VALUES ('${params.name}')
    `
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '添加成功'
      })
    })
  })
}

module.exports.publicFacilityEdit = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE public_facility SET
      name = '${params.name}'
      WHERE id = ${params.id}
    `
    SQL(sql, function () {
      resolve({
        code: 200,
        msg: '修改成功'
      })
    })
  })
}

module.exports.publicFacilityDelete = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM public_facility WHERE id = ${params.id}`
    SQL(sql, function () {
      resolve({
        code: 200,
        msg: '删除成功'
      })
    })
  })
}
/** 公共设施 End */


/** 便利设施 */
module.exports.getConvenientFacility = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM convenient_facility`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

module.exports.convenientFacilityAdd = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO
    convenient_facility
      (name, image) VALUES ('${params.name}', '${params.image}')
    `
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '添加成功'
      })
    })
  })
}

module.exports.convenientFacilityEdit = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE convenient_facility SET
      name = '${params.name}', image = '${params.image}'
      WHERE id = ${params.id}
    `
    SQL(sql, function () {
      resolve({
        code: 200,
        msg: '修改成功'
      })
    })
  })
}

module.exports.convenientFacilityDelete = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM convenient_facility WHERE id = ${params.id}`
    SQL(sql, function () {
      resolve({
        code: 200,
        msg: '删除成功'
      })
    })
  })
}
/** 便利设施 End */
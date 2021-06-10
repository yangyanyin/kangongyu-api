const SQL = require('../tools/mysql/index')

module.exports.getTrafficList = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM traffic`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

module.exports.trafficAdd = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO
      traffic
      (name, color) VALUES ('${params.name}', '${params.color}')
    `
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '添加成功'
      })
    })
  })
}

module.exports.trafficEdit = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE traffic SET
      name = '${params.name}', color = '${params.color}'
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

module.exports.trafficDelete = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM traffic WHERE id = ${params.id}`
    SQL(sql, function () {
      resolve({
        code: 200,
        msg: '删除成功'
      })
    })
  })
}
